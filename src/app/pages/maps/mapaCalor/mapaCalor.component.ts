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

@Component({
  selector: 'ngx-mapa-calor',
  styleUrls: ['./mapaCalor.component.scss'],
  templateUrl: './mapaCalor.component.html',
})
export class MapaCalorComponent implements OnDestroy, OnInit {

disasters = [
    {value: 1, name: 'Tsunamies'},
    {value: 2, name: 'Volcans'},
  ];

onChange($event){
    this.onChangeEvent(null);
}

  onChangeEvent(e) {
    const that = this;
    this.disasterService.getDisastersHotMap(this.range[0], this.range[1], this.disasterType).subscribe(resp => {
      const result: Array<any> = [];
      this.max = 0;
      resp.forEach(item => {
        const value = item.TOTAL_DEATHS === '' ? 1 : parseFloat(item.TOTAL_DEATHS);
        that.max = Math.max(that.max, value);
        result.push([item.LONGITUDE, item.LATITUDE, value]);
      });
      // console.log('result: ', result);
      const dom = document.getElementById('chartmapcalor');
      const chart = this.es.init(dom);
      this.options.title.subtext = "Desde el año " + this.range[0] + " hasta el año " + this.range[1];
      this.options.series = {
        name: 'AQI',
        type: 'heatmap',
        coordinateSystem: 'geo',
        data: result,
      };
      chart.setOption(this.options, true);
      // console.log('resp: ', resp);
    });


  }

  range=[1900,2016]; 
  
  rangeChanged(event:any){
    this.onChangeEvent(null);
  }  

  disasterType: number = 1;

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

        this.min = 1;
        this.max = 50;
        const that = this;

        this.options = {
          title: {
              text: 'Mapa Termico de Desastres en el Mundo',
              subtext: 'Computación Gráfica',
              sublink: 'http://www.pm25.in',
              left: 'center',
              textStyle: {
                  color: '#fff',
              },
          },
          backgroundColor: '#404a59',
          visualMap: {
              min: 0,
              max: Math.floor(that.max/4)*4, //316000
              splitNumber: 4,
              inRange: {
                  color: ['#d94e5d', '#eac736', '#50a3ba'].reverse(),
              },
              textStyle: {
                  color: '#fff',
              },
          },
          geo: {
              map: 'world',
              label: {
                  emphasis: {
                      show: false,
                  },
              },
              roam: true,
              itemStyle: {
                  normal: {
                      areaColor: '#323c48',
                      borderColor: '#111',
                  },
                  emphasis: {
                      areaColor: '#2a333d',
                  },
              },
          },
          series: [{
              name: 'AQI',
              type: 'heatmap',
              coordinateSystem: 'geo',
              data: [],
          }],
      };

      this.onChangeEvent(null);
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }                            
}
