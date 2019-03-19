import { Component, OnInit } from '@angular/core';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import { PersistanceService } from '../../../../core/services/persistance/persistance.service';
import { FileUploadResponse } from '../../models/FileUploadResponse';

@Component({
    selector: 'app-files',
    templateUrl: './files.component.html',
    styleUrls: ['./files.component.less']
})
export class FilesComponent implements OnInit {
    uploader: FileUploader = null;
    hasBaseDropZoneOver = false;
    uploaderResponses: { [key: string]: FileUploadResponse; } = {};

    constructor(private persistanceService: PersistanceService) {
    }

    ngOnInit(): void {
        const actionToken = this.persistanceService.getAccessToken();
        this.uploader = new FileUploader({
            url: 'http://localhost:8004/files',
            authToken: 'Bearer ' + actionToken,
            autoUpload: true
        });

        this.uploader.onErrorItem = ((item: FileItem, response: string, status: number, headers: ParsedResponseHeaders):any => {
            this.uploader.removeFromQueue(item);
        });

        this.uploader.onSuccessItem = ((item: FileItem, response: string, status: number, headers: ParsedResponseHeaders):any => {
            const fileUploadResponse: FileUploadResponse = JSON.parse(response);
            this.uploaderResponses[item.file.name] = fileUploadResponse;

            console.log(response);
        });
    }

    public fileOverBase(e: any): void {
      this.hasBaseDropZoneOver = e;
    }

    public getFileUploadResponse(fileItem: FileItem): FileUploadResponse {
        return this.uploaderResponses[fileItem.file.name];
    }
}
