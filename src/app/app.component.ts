import { Component } from '@angular/core';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { News } from './Model/news';
import { NewsapiServiceService } from './newsapi-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'NewsAPP';
  newsList: News[] = [ ]; 
  TopNews!: News;
  searchText = '';
  isNewsDataLoded : boolean = false;
  private imageBaseUrl: string = environment.imageBaseUrl;
  constructor(private newsService: NewsapiServiceService,private spinner: NgxSpinnerService) {         
  }

  ngOnInit(): void {   
    this.spinner.show();
    setTimeout(() => {
      this.getNewsList();
      this.spinner.hide();
    },2000);    
  }

  private getNewsList(){
    this.newsService.getAllNews('News').subscribe((newsRes) => {  
      this.isNewsDataLoded = true;
      debugger
      this.renderNewsList(newsRes);
    });
  }

  searchNews(data:Event) {     
    let searchText = (data.target as HTMLInputElement).value
    if(searchText !== ''){
      this.newsService.searchNews(searchText,'News/SearchAllNews?searchText').subscribe((newsRes) => { 
        this.isNewsDataLoded = true;
        this.renderNewsList(newsRes);
      });
    }else
    {
       this.getNewsList();
    }    

  }

  private renderNewsList(newsData : News[]){
    //Getting Top News base on last inserted news detail
    this.TopNews = newsData.splice(0, 1)[0] as News;   
   
    var topNewsImage = this.TopNews.imagePath.slice(this.TopNews.imagePath.indexOf('/')+1);
    this.TopNews.imagePath = this.generateImagePath(this.TopNews.date,topNewsImage);      
    this.newsList = newsData;

    this.newsList.forEach( (element: { imagePath: string; date: Date; }) => {
      var elImageName = element.imagePath.slice(element.imagePath.indexOf('/')+1).toString();
      element.imagePath = this.generateImagePath(element.date,elImageName)
      return element;
    });
  }

  private generateImagePath(newsDate:Date, topNewsImage:string){
    var year = moment(newsDate,'YYYY').format('YYYY');
    var month = moment(newsDate,'YYYY-MM-DD').format('MMMM');
    var date = moment(newsDate,'YYYY-MM-DD').format('DDMMyyyy');
    return `${this.imageBaseUrl}/${year}/${month}/${date}/${topNewsImage}`;
    
  }
}
