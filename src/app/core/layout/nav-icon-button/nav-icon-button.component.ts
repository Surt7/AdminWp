import { Component, input } from '@angular/core';
// import { navItems } from '../admin-layout.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Divider } from 'primeng/divider';
import { Tooltip } from 'primeng/tooltip';
import { NavItem } from '../admin-layout.component';

@Component({
  selector: 'nav-icon-button',
  templateUrl: './nav-icon-button.component.html',
  styleUrl: './nav-icon-button.component.css',
  standalone: true,
  imports: [Divider, RouterLink, Tooltip, RouterLinkActive],
})
export class NavIconButtonComponent {
  navItems = input.required<NavItem[]>();
}
