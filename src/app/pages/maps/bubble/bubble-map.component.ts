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

  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    if (value > 0) {
      return value + ' D.C.';
    } else {
      if (value < 0) {
        return (value * -1) + ' A.C.';
      }
    }
    return value;
  }

  onKeyUpTxt(event: any) {
    if (event.keyCode === 13) {
      this.onChangeEvent(null);
   }
  }

  onAutomatic(){
    var that = this;
    this.disasterService.getYears().subscribe(year => {
      
      let index = 0;
      let timer = Observable.timer(1000, 4000);
      timer.subscribe(()=>{

        that.yearValue = year[index].year;
        console.log(that.yearValue);
        that.onChangeEvent(null);
        index++;
      });      

    });
  }

  onChangeEvent(e) {
    const that = this;
    this.disasterService.getDisasterByYear(this.yearValue).subscribe(resp => {
      const result: Array<any> = [];
      this.max = 0;
      resp.forEach(item => {

        const value = item.TOTAL_DEATHS === '' ? 1 : parseFloat(item.TOTAL_DEATHS);
        that.max = Math.max(that.max, value);


        // if(value > that.max){
        //   that.max = value;
        // }
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

  yearValue: number = 2000;

  ngOnInit(): void {

  }

  mapData: any[];
  max = -Infinity;
  min = Infinity;
  options: any;

  bubbleTheme: any;
  geoColors: any[];
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
            text: 'World Population (2011)',
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
            name: 'World Population (2010)',
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
