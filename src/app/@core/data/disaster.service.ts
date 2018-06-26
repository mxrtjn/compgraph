import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DisasterService {

  constructor(private http: HttpClient) {

  }

  private disasterPosition: Array<any> = [
    {'name': 'New York', 'value': [-73.9865812, 40.7305991, 8287238], 'itemStyle':
    {'normal': {'color': '#0088ff'}}},
    {'name': 'Chicago', 'value': [-87.6244212, 41.8755546, 2705627], 'itemStyle':
    {'normal': {'color': '#0088ff'}}},
    {'name': 'Afghanistan', 'value': [65, 33, 32358260], 'itemStyle': {'normal': {'color': '#0088ff'}}},
    {'name': 'Albania', 'value': [20, 41, 3215988], 'itemStyle': {'normal': {'color': '#0088ff'}}},
    {'name': 'Algeria', 'value': [3, 28, 35980193], 'itemStyle': {'normal': {'color': '#ff386a'}}},
    {'name': 'Angola', 'value': [18.5, -12.5, 19618432], 'itemStyle': {'normal': {'color': '#00d977'}}},
    {'name': 'Argentina', 'value': [-64, -34, 40764561], 'itemStyle': {'normal': {'color': '#00d977'}}},
    {'name': 'Armenia', 'value': [45, 40, 3100236], 'itemStyle': {'normal': {'color': '#00d977'}}},
    {'name': 'Australia', 'value': [133, -27, 22605732], 'itemStyle': {'normal': {'color': '#0088ff'}}},
    {'name': 'Austria', 'value': [13.3333, 47.3333, 8413429], 'itemStyle': {'normal': {'color': '#00d977'}}},
    {'name': 'Azerbaijan', 'value': [47.5, 40.5, 9306023], 'itemStyle': {'normal': {'color': '#0088ff'}}},
    {'name': 'Bahrain', 'value': [50.55, 26, 1323535], 'itemStyle': {'normal': {}}},
    {'name': 'Bangladesh', 'value': [90, 24, 150493658], 'itemStyle': {'normal': {'color': '#00d977'}}},
    {'name': 'Belarus', 'value': [28, 53, 9559441], 'itemStyle': {'normal': {'color': '#ff386a'}}},
    {'name': 'Belgium', 'value': [4, 50.8333, 10754056], 'itemStyle': {'normal': {}}},
    {'name': 'Benin', 'value': [2.25, 9.5, 9099922], 'itemStyle': {'normal': {'color': '#ffa100'}}},
    {'name': 'Bhutan', 'value': [90.5, 27.5, 738267], 'itemStyle': {'normal': {'color': '#ffa100'}}},
    {'name': 'Bolivia', 'value': [-65, -17, 10088108], 'itemStyle': {'normal': {'color': '#0088ff'}}},
    {'name': 'Bosnia and Herzegovina', 'value': [18, 44, 3752228], 'itemStyle': {'normal': {'color': '#ff386a'}}},
    {'name': 'Botswana', 'value': [24, -22, 2030738], 'itemStyle': {'normal': {'color': '#00d977'}}},
    {'name': 'Brazil', 'value': [-55, -10, 196655014], 'itemStyle': {'normal': {'color': '#00d977'}}},
    {'name': 'Brunei', 'value': [114.6667, 4.5, 405938], 'itemStyle': {'normal': {'color': '#00d977'}}},
    {'name': 'Bulgaria', 'value': [25, 43, 7446135], 'itemStyle': {'normal': {'color': '#ff386a'}}},
    {'name': 'Burkina Faso', 'value': [-2, 13, 16967845], 'itemStyle': {'normal': {'color': '#ff386a'}}},
    {'name': 'Burundi', 'value': [30, -3.5, 8575172], 'itemStyle': {'normal': {'color': '#ffa100'}}},
    {'name': 'Cambodia', 'value': [105, 13, 14305183], 'itemStyle': {'normal': {'color': '#ffa100'}}},
    {'name': 'Cameroon', 'value': [12, 6, 20030362], 'itemStyle': {'normal': {'color': '#00d977'}}},
    {'name': 'Canada', 'value': [-100, 54, 34349561], 'itemStyle': {'normal': {'color': '#0088ff'}}},
    {'name': 'Cape Verde', 'value': [-24, 16, 500585], 'itemStyle': {'normal': {'color': '#00d977'}}},
    {'name': 'Central African Rep.', 'value': [21, 7, 4486837], 'itemStyle': {'normal': {'color': '#ffa100'}}},
    {'name': 'Chad', 'value': [19, 15, 11525496], 'itemStyle': {'normal': {'color': '#7659ff'}}},
    {'name': 'Chile', 'value': [-71, -30, 17269525], 'itemStyle': {'normal': {}}},
    {'name': 'China', 'value': [105, 35, 1347565324], 'itemStyle': {'normal': {'color': '#00d977'}}},
    {'name': 'Colombia', 'value': [-72, 4, 46927125], 'itemStyle': {'normal': {'color': '#ffa100'}}},
    {'name': 'Comoros', 'value': [44.25, -12.1667, 753943], 'itemStyle': {'normal': {'color': '#ff386a'}}},
    {'name': 'Congo, Dem. Rep.', 'value': [25, 0, 67757577], 'itemStyle': {'normal': {'color': '#0088ff'}}},
    {'name': 'Congo, Rep.', 'value': [15, -1, 4139748], 'itemStyle': {'normal': {'color': '#0088ff'}}},
    {'name': 'Costa Rica', 'value': [-84, 10, 4726575], 'itemStyle': {'normal': {}}},
    {'name': 'Cote dIvoire', 'value': [-5, 8, 20152894], 'itemStyle': {'normal': {}}},
    {'name': 'Croatia', 'value': [15.5, 45.1667, 4395560], 'itemStyle': {'normal': {}}},
    {'name': 'Cuba', 'value': [-80, 21.5, 11253665], 'itemStyle': {'normal': {'color': '#7659ff'}}},
    {'name': 'Cyprus', 'value': [33, 35, 1116564], 'itemStyle': {'normal': {'color': '#ffa100'}}},
    {'name': 'Czech Rep.', 'value': [15.5, 49.75, 10534293], 'itemStyle': {'normal': {'color': '#0088ff'}}},
    {'name': 'Denmark', 'value': [10, 56, 5572594], 'itemStyle': {'normal': {'color': '#7659ff'}}},
    {'name': 'Djibouti', 'value': [43, 11.5, 905564], 'itemStyle': {'normal': {'color': '#ff386a'}}},
    {'name': 'Dominican Rep.', 'value': [-70.6667, 19, 10056181], 'itemStyle': {'normal': {'color': '#ffa100'}}},
    {'name': 'Ecuador', 'value': [-77.5, -2, 14666055], 'itemStyle': {'normal': {'color': '#7659ff'}}},
    {'name': 'Egypt', 'value': [30, 27, 82536770], 'itemStyle': {'normal': {'color': '#ff386a'}}},
    {'name': 'El Salvador', 'value': [-88.9167, 13.8333, 6227491], 'itemStyle': {'normal': {'color': '#0088ff'}}},
    {'name': 'Equatorial Guinea', 'value': [10, 2, 720213], 'itemStyle': {'normal': {'color': '#ff386a'}}},
    {'name': 'Eritrea', 'value': [39, 15, 5415280], 'itemStyle': {'normal': {'color': '#00d977'}}},
    {'name': 'Estonia', 'value': [26, 59, 1340537], 'itemStyle': {'normal': {'color': '#00d977'}}},
    {'name': 'Ethiopia', 'value': [38, 8, 84734262], 'itemStyle': {'normal': {'color': '#ff386a'}}},
    {'name': 'Fiji', 'value': [175, -18, 868406], 'itemStyle': {'normal': {'color': '#ffa100'}}},
    {'name': 'Finland', 'value': [26, 62, 5384770], 'itemStyle': {'normal': {'color': '#ff386a'}}},
    {'name': 'France', 'value': [2, 46, 63125894], 'itemStyle': {'normal': {'color': '#ff386a'}}},
    {'name': 'Gabon', 'value': [11.75, -1, 1534262], 'itemStyle': {'normal': {}}},
    {'name': 'Gambia', 'value': [-16.5667, 13.4667, 1776103], 'itemStyle': {'normal': {'color': '#ffa100'}}},
    {'name': 'Georgia', 'value': [43.5, 42, 4329026], 'itemStyle': {'normal': {'color': '#0088ff'}}},
    {'name': 'Germany', 'value': [9, 51, 82162512], 'itemStyle': {'normal': {}}},
    {'name': 'Ghana', 'value': [-2, 8, 24965816], 'itemStyle': {'normal': {'color': '#0088ff'}}},
    {'name': 'Greece', 'value': [22, 39, 11390031], 'itemStyle': {'normal': {}}},
    {'name': 'Guatemala', 'value': [-90.25, 15.5, 14757316], 'itemStyle': {'normal': {}}},
    {'name': 'Guinea', 'value': [-10, 11, 10221808], 'itemStyle': {'normal': {'color': '#ff386a'}}},
    {'name': 'Guinea-Bissau', 'value': [-15, 12, 1547061], 'itemStyle': {'normal': {'color': '#0088ff'}}},
    {'name': 'Guyana', 'value': [-59, 5, 756040], 'itemStyle': {'normal': {'color': '#ff386a'}}},
    {'name': 'Haiti', 'value': [-72.4167, 19, 10123787], 'itemStyle': {'normal': {'color': '#7659ff'}}},
    {'name': 'Honduras', 'value': [-86.5, 15, 7754687], 'itemStyle': {'normal': {'color': '#00d977'}}},
    {'name': 'Hong Kong, China', 'value': [114.1667, 22.25, 7122187], 'itemStyle': {'normal': {'color': '#00d977'}}},
    {'name': 'Hungary', 'value': [20, 47, 9966116], 'itemStyle': {'normal': {}}},
    {'name': 'Iceland', 'value': [-18, 65, 324366], 'itemStyle': {'normal': {'color': '#0088ff'}}},
    {'name': 'India', 'value': [77, 20, 1241491960], 'itemStyle': {'normal': {'color': '#0088ff'}}},
    {'name': 'Indonesia', 'value': [120, -5, 242325638], 'itemStyle': {'normal': {'color': '#0088ff'}}},
    {'name': 'Iran', 'value': [53, 32, 74798599], 'itemStyle': {'normal': {'color': '#00d977'}}},
    {'name': 'Iraq', 'value': [44, 33, 32664942], 'itemStyle': {'normal': {}}},
    {'name': 'Ireland', 'value': [-8, 53, 4525802], 'itemStyle': {'normal': {'color': '#ffa100'}}},
    {'name': 'Israel', 'value': [34.75, 31.5, 7562194], 'itemStyle': {'normal': {'color': '#00d977'}}},
    {'name': 'Italy', 'value': [12.8333, 42.8333, 60788694], 'itemStyle': {'normal': {'color': '#ffa100'}}},
    {'name': 'Jamaica', 'value': [-77.5, 18.25, 2751273], 'itemStyle': {'normal': {'color': '#ff386a'}}},
    {'name': 'Japan', 'value': [138, 36, 126497241], 'itemStyle': {'normal': {'color': '#00d977'}}},
    {'name': 'Jordan', 'value': [36, 31, 6330169], 'itemStyle': {'normal': {'color': '#0088ff'}}},
    {'name': 'Kazakhstan', 'value': [68, 48, 16206750], 'itemStyle': {'normal': {'color': '#ffa100'}}},
    {'name': 'Kenya', 'value': [38, 1, 41609728], 'itemStyle': {'normal': {'color': '#7659ff'}}},
    {'name': 'Korea, Dem. Rep.', 'value': [127, 40, 24451285], 'itemStyle': {'normal': {}}},
    {'name': 'Korea, Rep.', 'value': [127.5, 37, 48391343], 'itemStyle': {'normal': {'color': '#ff386a'}}},
    {'name': 'Kuwait', 'value': [47.6581, 29.3375, 2818042], 'itemStyle': {'normal': {'color': '#ffa100'}}},
    {'name': 'Kyrgyzstan', 'value': [75, 41, 5392580], 'itemStyle': {'normal': {'color': '#00d977'}}},
    {'name': 'Laos', 'value': [105, 18, 6288037], 'itemStyle': {'normal': {'color': '#0088ff'}}},
    {'name': 'Latvia', 'value': [25, 57, 2243142], 'itemStyle': {'normal': {'color': '#ff386a'}}},
    {'name': 'Lebanon', 'value': [35.8333, 33.8333, 4259405], 'itemStyle': {'normal': {'color': '#0088ff'}}},
    {'name': 'Lesotho', 'value': [28.5, -29.5, 2193843], 'itemStyle': {'normal': {'color': '#0088ff'}}},
    {'name': 'Liberia', 'value': [-9.5, 6.5, 4128572], 'itemStyle': {'normal': {'color': '#0088ff'}}},
    {'name': 'Libya', 'value': [17, 25, 6422772], 'itemStyle': {'normal': {'color': '#00d977'}}},
    {'name': 'Lithuania', 'value': [24, 55, 3307481], 'itemStyle': {'normal': {'color': '#0088ff'}}},
    {'name': 'Luxembourg', 'value': [6, 49.75, 515941], 'itemStyle': {'normal': {'color': '#00d977'}}},
    {'name': 'Macedonia, FYR', 'value': [22, 41.8333, 2063893], 'itemStyle': {'normal': {'color': '#ffa100'}}},
    {'name': 'Madagascar', 'value': [47, -20, 21315135], 'itemStyle': {'normal': {'color': '#ff386a'}}},
    {'name': 'Malawi', 'value': [34, -13.5, 15380888], 'itemStyle': {'normal': {'color': '#ffa100'}}},
    {'name': 'Malaysia', 'value': [112.5, 2.5, 28859154], 'itemStyle': {'normal': {'color': '#0088ff'}}},
    {'name': 'Mali', 'value': [-4, 17, 15839538], 'itemStyle': {'normal': {'color': '#7659ff'}}},
    {'name': 'Mauritania', 'value': [-12, 20, 3541540], 'itemStyle': {'normal': {'color': '#0088ff'}}},
    {'name': 'Mauritius', 'value': [57.55, -20.2833, 1306593], 'itemStyle': {'normal': {}}},
    {'name': 'Mexico', 'value': [-102, 23, 114793341], 'itemStyle': {'normal': {'color': '#ff386a'}}},
    {'name': 'Moldova', 'value': [29, 47, 3544864], 'itemStyle': {'normal': {'color': '#ffa100'}}},
    {'name': 'Mongolia', 'value': [105, 46, 2800114], 'itemStyle': {'normal': {}}},
    {'name': 'Montenegro', 'value': [19.4, 42.5, 632261], 'itemStyle': {'normal': {'color': '#00d977'}}},
    {'name': 'Morocco', 'value': [-5, 32, 32272974], 'itemStyle': {'normal': {}}},
    {'name': 'Mozambique', 'value': [35, -18.25, 23929708], 'itemStyle': {'normal': {'color': '#ff386a'}}},
    {'name': 'Myanmar', 'value': [98, 22, 48336763], 'itemStyle': {'normal': {'color': '#0088ff'}}},
    {'name': 'Namibia', 'value': [17, -22, 2324004], 'itemStyle': {'normal': {'color': '#0088ff'}}},
    {'name': 'Nepal', 'value': [84, 28, 30485798], 'itemStyle': {'normal': {'color': '#ff386a'}}},
    {'name': 'Netherlands', 'value': [5.75, 52.5, 16664746], 'itemStyle': {'normal': {'color': '#00d977'}}},
    {'name': 'New Zealand', 'value': [174, -41, 4414509], 'itemStyle': {'normal': {'color': '#ffa100'}}},
    {'name': 'Nicaragua', 'value': [-85, 13, 5869859], 'itemStyle': {'normal': {'color': '#0088ff'}}},
    {'name': 'Niger', 'value': [8, 16, 16068994], 'itemStyle': {'normal': {'color': '#ff386a'}}},
    {'name': 'Nigeria', 'value': [8, 10, 162470737], 'itemStyle': {'normal': {'color': '#ffa100'}}},
    {'name': 'Norway', 'value': [10, 62, 4924848], 'itemStyle': {'normal': {'color': '#ffa100'}}},
    {'name': 'Oman', 'value': [57, 21, 2846145], 'itemStyle': {'normal': {'color': '#ffa100'}}},
    {'name': 'Pakistan', 'value': [70, 30, 176745364], 'itemStyle': {'normal': {'color': '#ff386a'}}},
    {'name': 'Panama', 'value': [-80, 9, 3571185], 'itemStyle': {'normal': {'color': '#ffa100'}}},
    {'name': 'Papua New Guinea', 'value': [147, -6, 7013829], 'itemStyle': {'normal': {'color': '#ffa100'}}},
    {'name': 'Paraguay', 'value': [-58, -23, 6568290], 'itemStyle': {'normal': {'color': '#ffa100'}}},
    {'name': 'Peru', 'value': [-76, -10, 29399817], 'itemStyle': {'normal': {'color': '#7659ff'}}},
    {'name': 'Philippines', 'value': [122, 13, 94852030], 'itemStyle': {'normal': {'color': '#ff386a'}}},
    {'name': 'Poland', 'value': [20, 52, 38298949], 'itemStyle': {'normal': {'color': '#00d977'}}},
    {'name': 'Portugal', 'value': [-8, 39.5, 10689663], 'itemStyle': {'normal': {'color': '#ff386a'}}},
    {'name': 'Puerto Rico', 'value': [-66.5, 18.25, 3745526], 'itemStyle': {'normal': {}}},
    {'name': 'Qatar', 'value': [51.25, 25.5, 1870041], 'itemStyle': {'normal': {'color': '#ffa100'}}},
    {'name': 'Romania', 'value': [25, 46, 21436495], 'itemStyle': {'normal': {'color': '#ff386a'}}},
    {'name': 'Russia', 'value': [100, 60, 142835555], 'itemStyle': {'normal': {'color': '#ffa100'}}},
    {'name': 'Rwanda', 'value': [30, -2, 10942950], 'itemStyle': {'normal': {}}},
    {'name': 'Saudi Arabia', 'value': [45, 25, 28082541], 'itemStyle': {'normal': {'color': '#ffa100'}}},
    {'name': 'Senegal', 'value': [-14, 14, 12767556], 'itemStyle': {'normal': {'color': '#0088ff'}}},
    {'name': 'Serbia', 'value': [21, 44, 9853969], 'itemStyle': {'normal': {}}},
    {'name': 'Sierra Leone', 'value': [-11.5, 8.5, 5997486], 'itemStyle': {'normal': {'color': '#0088ff'}}},
    {'name': 'Singapore', 'value': [103.8, 1.3667, 5187933], 'itemStyle': {'normal': {'color': '#0088ff'}}},
    {'name': 'Slovak Republic', 'value': [19.5, 48.6667, 5471502], 'itemStyle': {'normal': {}}},
    {'name': 'Slovenia', 'value': [15, 46, 2035012], 'itemStyle': {'normal': {'color': '#00d977'}}},
    {'name': 'Solomon Islands', 'value': [159, -8, 552267], 'itemStyle': {'normal': {'color': '#00d977'}}},
    {'name': 'Somalia', 'value': [49, 10, 9556873], 'itemStyle': {'normal': {}}},
    {'name': 'South Africa', 'value': [24, -29, 50459978], 'itemStyle': {'normal': {'color': '#0088ff'}}},
    {'name': 'Spain', 'value': [-4, 40, 46454895], 'itemStyle': {'normal': {'color': '#ff386a'}}},
    {'name': 'Sri Lanka', 'value': [81, 7, 21045394], 'itemStyle': {'normal': {'color': '#0088ff'}}},
    {'name': 'Sudan', 'value': [30, 15, 34735288], 'itemStyle': {'normal': {'color': '#0088ff'}}},
    {'name': 'Suriname', 'value': [-56, 4, 529419], 'itemStyle': {'normal': {'color': '#00d977'}}},
    {'name': 'Swaziland', 'value': [31.5, -26.5, 1203330], 'itemStyle': {'normal': {'color': '#00d977'}}},
    {'name': 'Sweden', 'value': [15, 62, 9440747], 'itemStyle': {'normal': {'color': '#00d977'}}},
    {'name': 'Switzerland', 'value': [8, 47, 7701690], 'itemStyle': {'normal': {'color': '#7659ff'}}},
    {'name': 'Syria', 'value': [38, 35, 20766037], 'itemStyle': {'normal': {'color': '#ff386a'}}},
    {'name': 'Taiwan', 'value': [121, 23.5, 23072000], 'itemStyle': {'normal': {'color': '#00d977'}}},
    {'name': 'Tajikistan', 'value': [71, 39, 6976958], 'itemStyle': {'normal': {'color': '#ff386a'}}},
    {'name': 'Tanzania', 'value': [35, -6, 46218486], 'itemStyle': {'normal': {'color': '#0088ff'}}},
    {'name': 'Thailand', 'value': [100, 15, 69518555], 'itemStyle': {'normal': {'color': '#0088ff'}}},
    {'name': 'Togo', 'value': [1.1667, 8, 6154813], 'itemStyle': {'normal': {'color': '#00d977'}}},
    {'name': 'Trinidad and Tobago', 'value': [-61, 11, 1346350], 'itemStyle': {'normal': {}}},
    {'name': 'Tunisia', 'value': [9, 34, 10594057], 'itemStyle': {'normal': {'color': '#ffa100'}}},
    {'name': 'Turkey', 'value': [35, 39, 73639596], 'itemStyle': {'normal': {'color': '#0088ff'}}},
    {'name': 'Turkmenistan', 'value': [60, 40, 5105301], 'itemStyle': {'normal': {'color': '#00d977'}}},
    {'name': 'Uganda', 'value': [32, 1, 34509205], 'itemStyle': {'normal': {'color': '#0088ff'}}},
    {'name': 'Ukraine', 'value': [32, 49, 45190180], 'itemStyle': {'normal': {'color': '#00d977'}}},
    {'name': 'United Arab Emirates', 'value': [54, 24, 7890924], 'itemStyle': {'normal': {'color': '#ffa100'}}},
    {'name': 'United Kingdom', 'value': [-2, 54, 62417431], 'itemStyle': {'normal': {'color': '#7659ff'}}},
    {'name': 'United States', 'value': [-97, 38, 313085380], 'itemStyle': {'normal': {'color': '#ff386a'}}},
    {'name': 'Uruguay', 'value': [-56, -33, 3380008], 'itemStyle': {'normal': {'color': '#00d977'}}},
    {'name': 'Uzbekistan', 'value': [64, 41, 27760267], 'itemStyle': {'normal': {'color': '#0088ff'}}},
    {'name': 'Venezuela', 'value': [-66, 8, 29436891], 'itemStyle': {'normal': {'color': '#ffa100'}}},
    {'name': 'West Bank and Gaza', 'value': [35.25, 32, 4152369], 'itemStyle': {'normal': {'color': '#7659ff'}}},
    {'name': 'Vietnam', 'value': [106, 16, 88791996], 'itemStyle': {'normal': {'color': '#00d977'}}},
    {'name': 'Yemen, Rep.', 'value': [48, 15, 24799880], 'itemStyle': {'normal': {'color': '#ffa100'}}},
    {'name': 'Zambia', 'value': [30, -15, 13474959], 'itemStyle': {'normal': {'color': '#ff386a'}}},
    {'name': 'Zimbabwe', 'value': [30, -20, 12754378], 'itemStyle': {'normal': {'color': '#7659ff'}}}];

  getAllDisasters() {
    return this.disasterPosition;
  }

  getDisasterByYear(year: number): Observable<any> {
    return this.http.get('api/disasters/' + year);
  }

  getDisasterPosition(year: number, disasterType: number): Observable<any> {
    return this.http.get('api/disaster/position/' + year + '/' + disasterType);
  }

  getYears(): Observable<any>{
    return this.http.get('/api/year/data');
  }


}
