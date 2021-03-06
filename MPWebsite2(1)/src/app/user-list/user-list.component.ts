import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'; 

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  elementType: "url" | "canvas" | "img" = "url";
  p: Number = 1;
  userList: any = [];
  loadedUserList: any[];
  constructor(private authService: AuthService) 
  {
   
    this.authService.getAllResident().subscribe(data =>{
      
      var Length = data.length;

      for (var i = 0; i < Length; i++){
        JSON.stringify(data[i]._id);
      }
      this.userList = data;
      this.loadedUserList = data;
      console.log(this.userList);
      
    });
    
  }

  ngOnInit(): void {
  }

  returnB(_id, greenCurrency) {
    this.authService.updateCollectionStatusReturn(_id, false, greenCurrency);
    location.reload();
  }

  initializeItems(): void {
    this.userList = this.loadedUserList;
  }

  search(event) {
    console.log('Function works!');
    this.initializeItems();
    //Set searchTerm with input from search bar
    const searchTerm = event.srcElement.value;
  
    if (!searchTerm) {
    return;
    }
    //Filters enquiries list with keywords from searchTerm
    this.userList = this.userList.filter(i => {
    if (i.name && searchTerm) {
    if (i.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
    return true;
    }
    return false;
    }
    });
  }

}
