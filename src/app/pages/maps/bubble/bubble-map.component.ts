import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { combineLatest } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
// import * as echarts from 'echarts';
// import ECharts = echarts.ECharts;
// import EChartOption = echarts.EChartOption;
import { NgxEchartsService } from 'ngx-echarts';
import { NbThemeService } from '@nebular/theme';
// import { Jsonp } from '@angular/http';
import { DisasterService } from '../../../@core/data/disaster.service';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'ngx-bubble-map',
  styleUrls: ['./bubble-map.component.scss'],
  templateUrl: './bubble-map.component.html',
})
export class BubbleMapComponent implements OnDestroy, OnInit {

  player: any = { paused: true};
  yearsWithData: Array<any> = [];
  yearValue: number = 1900;
  range=[this.yearValue,2016];  
  mapData: any[];
  max = -Infinity;
  min = Infinity;
  options: any;
  bubbleTheme: any;
  geoColors: any[];  
  timer = Observable.timer(200, 2000);
  subscription: any = null;

  ngOnInit(): void {
    var that = this;
    this.disasterService.getYears().subscribe(years => {
      that.yearsWithData = years;
    });
  }

  private getYearsFromRange(min: number, max: number):Array<any> {
    const result: Array<any> = [];
    this.yearsWithData.forEach(item => {
      if(item.year >= min && item.year <= max){
        result.push(item.year);
      }
    });
    return result;
  }

  onKeyUpTxt(event: any) {
    if (event.keyCode === 13) {
      this.onChangeEvent(null);
      this.range = [this.yearValue, this.range[1]];
   }
  }

  onPlayClick(){
    var that = this;
    if(that.player.paused) {//if press play
      that.player.paused = false;
      let years: Array<any> = that.getYearsFromRange(that.range[0], that.range[1]);
      
      let index = 0;
      that.subscription = that.timer.subscribe(() => {
        that.yearValue = years[index];
        that.range = [that.yearValue, that.range[1]];
        that.onChangeEvent(null);
        index++;
        if(index >= years.length ){
          that.player.paused = true;
          that.subscription.unsubscribe();
        }
      });  
    }
    else {//if press paused
      that.player.paused = true;
      if(that.subscription)
        that.subscription.unsubscribe();
    }
  }

  onNextClick() {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
    this.player.paused = true;
    this.yearValue = Math.min(this.yearValue + 1, 2016);
    this.range = [this.yearValue, this.range[1]];
    this.onChangeEvent(null);
  }

  onPrevClick() {
    if(this.subscription){
      this.subscription.unsubscribe();
    }  
    this.player.paused = true;
    this.yearValue = Math.max(this.yearValue - 1, -4360);  
    this.range = [this.yearValue, this.range[1]];
    this.onChangeEvent(null);
  }

  rangeChanged(){

  }

  onChangeEvent(e) {
    const that = this;
    this.disasterService.getDisasterByYear(this.yearValue).subscribe(resp => {
      const result: Array<any> = [];
      this.max = 0;
      resp.forEach(item => {

        const value = item.TOTAL_DEATHS === '' ? 1 : parseFloat(item.TOTAL_DEATHS);
        that.max = Math.max(that.max, value);
        result.push({'name': item.COUNTRY, 'value': [item.LONGITUDE, item.LATITUDE, value],
        'itemStyle': {'normal': {'color': item.color}}});
      });
      // console.log(this.max);
      const dom = document.getElementById('chart2');
      const chart = this.es.init(dom);
      this.options.title.text = 'Desastres Mundiales (' + this.yearValue  + (this.yearValue < 0 ? ' A.C' : '') + ')';
      this.options.series = {
        type: 'effectScatter',
        coordinateSystem: 'geo',
        data: result,
      };
      this.options.title.subtext = 'Max. Muertes: ' + this.max;
      this.options.visualMap.max = this.max;
      chart.setOption(this.options, true);
      // console.log('resp: ', resp);
    });


  }


  private alive = true;

  constructor(private theme: NbThemeService,
              private http: HttpClient,
              private es: NgxEchartsService,
              private disasterService: DisasterService) {

    combineLatest([
      this.http.get('assets/map/world.json'),
      this.theme.getJsTheme(),
    ])
      .pipe(takeWhile(() => this.alive))
      .subscribe(([map, config]: [any, any]) => {

        this.es.registerMap('world', map);
        const colors = config.variables;
        this.bubbleTheme = config.variables.bubbleMap;
        this.geoColors = [colors.primary, colors.info, colors.success, colors.warning, colors.danger];

        this.min = 0;
        this.max = 316000;

        this.options = {
          title: {
            text: 'World Population (' + this.yearValue + ')',
            left: 'center',
            top: 'top',
            textStyle: {
              color: this.bubbleTheme.titleColor,
            },
          },
          tooltip: {
            trigger: 'item',
            formatter: params => {
              return `${params.name}: ${params.value[2]}`;
            },
          },
          visualMap: {
            show: false,
            min: 0,
            max: this.max,
            inRange: {
              symbolSize: [6, 60],
            },
          },
          geo: {
            name: 'World Population (' + this.yearValue + ')',
            type: 'map',
            map: 'world',
            roam: true,
            label: {
              emphasis: {
                show: false,
              },
            },
            itemStyle: {
              normal: {
                areaColor: this.bubbleTheme.areaColor,
                borderColor: this.bubbleTheme.areaBorderColor,
              },
              emphasis: {
                areaColor: this.bubbleTheme.areaHoverColor,
              },
            },
            zoom: 1.1,
          },
          series: [
            {
              type: 'scatter',
              coordinateSystem: 'geo',
              data: [],
            },
          ],
        };
        this.onChangeEvent(null);
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }

  onChartInit(ec) {

  }

  // private getRandomGeoColor() {
  //   //
  //   const index = Math.round(Math.random() * this.geoColors.length);
  //   return this.geoColors[index];
  // }

  public onClickRefresh() {
    const year = Math.floor((Math.random() * 10) + 1);
    const dom = document.getElementById('chart2');
    const chart = this.es.init(dom);
    this.options.title.text = 'Year: ' + year;
    this.options.series = {
      type: 'scatter',
      coordinateSystem: 'geo',
      data: this.disasterService.getDisasterByYear(year),
    };
    chart.setOption(this.options, true);

  }

  // private getData() {
  //   // value[longitud,latitud, value]
  //   return this.disasterService.getAllDisasters();
  // }

}
