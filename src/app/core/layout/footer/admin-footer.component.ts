import { Component, inject } from '@angular/core';
import { ThemeService } from '../../theme/theme.service';
import { RouterLink } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { TooltipModule } from 'primeng/tooltip';
import { Divider } from 'primeng/divider';

@Component({
  selector: 'app-admin-footer',
  templateUrl: 'admin-footer.component.html',
  styleUrl: 'admin-footer.component.css',
  standalone: true,
  imports: [RouterLink, AvatarModule, TooltipModule, Divider],
})
export class AdminFooterComponent {
  protected readonly themeService = inject(ThemeService);
}
