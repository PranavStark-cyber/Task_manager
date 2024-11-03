import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TooltipModule } from 'ngx-bootstrap/tooltip';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,TooltipModule,RouterLink,RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Angular_Template_Forms';
  constructor(private router:Router){}

  GotoUserList(){
    this.router.navigate(['/user-list']);
  }

  GotoTaskList(){
    this.router.navigate(['/task-list']);
  }
  
}
