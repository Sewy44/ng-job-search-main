import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: 'app-jobs-table',
    standalone: true,
    templateUrl: './jobs-table.component.html',
    styleUrl: './jobs-table.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobsTableComponent{

}