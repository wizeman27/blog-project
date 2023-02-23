import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Blog } from '../blog/blog.model';
import { BlogService } from '../blog/blog.service';

export interface DialogData {
  address: string;
}

@Component({
  selector: 'app-blog-article',
  templateUrl: './blog-article.component.html',
  styleUrls: ['./blog-article.component.css'],
})
export class BlogArticleComponent implements OnInit {
  blog: Blog;
  address: string;

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const address = this.route.params.subscribe((params: Params) => {
      this.address = params['address'];
      this.blog = this.blogService.getBlog(this.address);
      console.log(JSON.stringify(this.blog));
    });
  }

  onDeletePost() {
    // open a dialog that asks to confirm, then delete the post.
    this.dialog.open(DeleteDialog, {
      data: { address: this.address },
    });
  }
}

@Component({
  selector: 'delete-dialog',
  styleUrls: ['./delete-dialog.css'],
  templateUrl: './delete-dialog.html',
})
export class DeleteDialog {
  constructor(
    private blogService: BlogService,
    private dialogRef: MatDialogRef<DeleteDialog>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onDelete() {
    console.log(this.data.address);
    if (this.data.address) {
      this.blogService.deleteBlog(this.data.address);
    }

    this.router.navigate(['/']);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
