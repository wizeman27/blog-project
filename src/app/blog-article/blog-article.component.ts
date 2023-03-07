import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar,  } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BlogBody, BlogMeta } from '../blog/blog.model';
import { BlogService } from '../blog/blog.service';

export interface DialogData {
  address: string;
  route: ActivatedRoute;
}

@Component({
  selector: 'app-blog-article',
  templateUrl: './blog-article.component.html',
  styleUrls: ['./blog-article.component.css'],
})
export class BlogArticleComponent implements OnInit {
  blogMeta: BlogMeta;
  blogBody: BlogBody;
  blogId: string;
  address: string;

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    const address = this.route.params.subscribe((params: Params) => {
      this.address = params['address'];
      this.blogMeta = this.blogService.getBlogMeta(this.address);
      console.log(JSON.stringify(this.blogMeta));
      this.blogId = this.blogMeta.blogId;
      this.blogBody = this.blogService.getBlogBody(this.blogId);
    });
  }

  onSelectSection(title: string) {
    this.router.navigate(['#' + title], { relativeTo: this.route });
  }

  onDeletePost() {
    // open a dialog that asks to confirm, then delete the post.
    this.dialog.open(DeleteDialog, {
      data: { address: this.address },
    });
  }

  onEdit() {
    let blogDraft = this.blogService.getBlogDraft(this.blogId);
    // if post has a draft that is more recent than published version,
    if (blogDraft) {
      if (blogDraft.lastSavedDate > this.blogMeta.publishedDate) {
        // check if user wants to load latest draft or published version.
        this.dialog.open(EditDialog, {
          data: { address: this.address, route: this.route },
        });
      }
    } else {
      this.router.navigate(['./edit'], { relativeTo: this.route });
    }
  }
}

@Component({
  selector: 'delete-dialog',
  styleUrls: ['./delete-dialog.css'],
  templateUrl: './delete-dialog.html',
})
export class DeleteDialog {
  title:string = this.blogService.getBlogMeta(this.data.address).title;

  constructor(
    private blogService: BlogService,
    private dialogRef: MatDialogRef<DeleteDialog>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private snackBar: MatSnackBar
  ) {}


  onDelete() {
    // console.log(this.data.address);
    if (this.data.address) {
      this.blogService.deleteBlog(this.data.address);
    }
    this.router.navigate(['/']);
  }

  openSnackBar() {

    let snackBarRef = this.snackBar.open(`"${this.title}" has been deleted.`, 'OK', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
    snackBarRef.onAction().subscribe(() => {
      console.log('The snackbar action was triggered!');
      snackBarRef.dismiss();
    });
  }

  onCancel() {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'edit-dialog',
  styleUrls: ['./edit-dialog.css'],
  templateUrl: './edit-dialog.html',
})
export class EditDialog {
  constructor(
    //private dialogRef: MatDialogRef<DeleteDialog>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onConfirm() {
    this.router.navigate(['./edit-draft'], { relativeTo: this.data.route });
  }

  onCancel() {
    this.router.navigate(['./edit'], { relativeTo: this.data.route });
  }
}
