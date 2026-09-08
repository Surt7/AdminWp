import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkActive, RouterLink } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { Divider, DividerModule } from 'primeng/divider';
import { AvatarModule } from 'primeng/avatar';
interface NavItem{
  icon: string;
  label:string;
  route: string;
}

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css',
  imports: [RouterOutlet,
    RouterLink,
    RouterLinkActive,
    Divider,
    DividerModule,
    AvatarModule,
    TooltipModule,
  ],
})
export class AdminLayout {
  protected readonly navItems: NavItem[] = [
    { icon: 'pi pi-home', label: 'Dashboard', route: '/dashboard' },
    { icon: 'pi pi-server', label: 'Machines', route: '/machines' },
    { icon: 'pi pi-trophy', label: 'Leaderboard', route: '/leaderboard' },
    { icon: 'pi pi-users', label: 'Utilisateurs', route: '/users' },
    { icon: 'pi pi-truck', label: 'Transports', route: '/transports' },
  ];
}
