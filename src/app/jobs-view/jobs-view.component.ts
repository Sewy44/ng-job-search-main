import { Component } from "@angular/core";
import { JobsTableComponent } from "../jobs-table/jobs-table.component";

@Component({
    selector: "app-jobs-view",
    standalone: true,
    imports: [JobsTableComponent],
    templateUrl: './jobs-view.component.html',
    styleUrl: './jobs-view.component.css'
})
export class JobsViewComponent {

}