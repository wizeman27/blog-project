import { Component, HostListener, Injectable, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { BlogService } from '../blog/blog.service';
import { ComponentCanDeactivate } from './pending-changes.guard';

export interface BlogTag {
  name: string;
}

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css'],
})
export class BlogEditComponent implements OnInit, ComponentCanDeactivate {
  address: string;
  editMode = false;
  isLinear = false;
  blogRequiredFields: FormGroup;
  blogOptionalFields: FormGroup;
  blogReview: FormGroup;
  formFieldWidth: number;
  blogText: FormGroup;
  isPublished: boolean;
  protected blogCategories = ['Article', 'Essay', 'Short story', 'First draft'];
  protected blogFeaturedOptions = ['Yes', 'No'];

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private router: Router,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.address = params['address'];
      //console.log(this.address);
      this.editMode =
        params['address'] !== null && params['address'] !== undefined;
      this.initForm();
    });
    this.formFieldWidth = window.innerWidth * 0.8;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.formFieldWidth = window.innerWidth * 0.8;
  }

  private initForm() {
    // required fields
    let blogTitle = '';
    let blogDescription = '';
    let blogFeatured = '';
    let blogPostFeatured = '';
    let blogAddress = '';
    let blogCategory = '';
    // other fields
    let blogHeroImage = 'https://source.unsplash.com/';
    let blogQuotes = new FormArray([]);
    let blogTags = new FormArray([]);
    let blogSections = new FormArray([]);

    // prepopulate fields
    if (this.editMode) {
      const blogPost = this.blogService.getBlog(this.address);
      blogTitle = blogPost.title;
      blogDescription = blogPost.description;
      // Display default value in select dropdown for Featured
      if (blogPost.featured) {
        blogPostFeatured = 'Yes';
      } else {
        blogPostFeatured = 'No';
      }
      const featuredIndex = this.blogFeaturedOptions.indexOf(blogPostFeatured);
      blogFeatured = this.blogFeaturedOptions[featuredIndex];
      // Also Category dropdown
      const categoryIndex = this.blogCategories.indexOf(blogPost.category);
      blogCategory = this.blogCategories[categoryIndex];
      blogAddress = blogPost.address;
      blogHeroImage = blogPost.heroImage;
      if (blogPost['quotes']) {
        for (let quote of blogPost.quotes) {
          blogQuotes.push(
            new FormGroup({
              quoteText: new FormControl(quote),
            })
          );
        }
      }
      if (blogPost['tags']) {
        for (let tag of blogPost.tags) {
          this.tags.push({ name: tag });
        }
      }
      if (blogPost['sections']) {
        for (let section of blogPost.sections) {
          blogSections.push(
            new FormGroup({
              sectionTitle: new FormControl(section.sectionTitle),
              sectionDescription: new FormControl(
                section.sectionText,
                Validators.required
              ),
              sectionImage: new FormControl(section.sectionImage),
            })
          );
        }
      }
    }

    // define the form template with 3 groups
    this.blogRequiredFields = this._formBuilder.group({
      title: new FormControl(blogTitle, Validators.required),
      description: new FormControl(blogDescription, Validators.required),
      featured: new FormControl(blogFeatured, Validators.required),
      category: new FormControl(blogCategory, Validators.required),
      address: new FormControl(blogAddress, Validators.required),
    });

    // auto-fill URL address based on blog title
    this.blogRequiredFields.get('title').valueChanges.subscribe((change) =>
      this.blogRequiredFields.get('address').setValue(
        change &&
          change
            .match(
              /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
            )
            .map((x) => x.toLowerCase())
            .join('-')
      )
    );
    this.blogText = new FormGroup({
      sections: blogSections,
    });

    this.blogOptionalFields = this._formBuilder.group({
      heroImage: new FormControl(blogHeroImage),
      quotes: blogQuotes,
      tags: new FormControl(blogTags),
    });

    this.blogReview = this._formBuilder.group({
      thirdCtrl: [''],
    });

    // Check if blog is already published
    const blogPost= this.blogService.getBlog(this.address);
    this.isPublished = blogPost.status === 'Published';

  }

  get sections() {
    return <FormArray>this.blogText.get('sections');
  }

  get quotes() {
    return <FormArray>this.blogOptionalFields.get('quotes');
  }

  newQuote(): FormGroup {
    return new FormGroup({
      quoteText: new FormControl(null),
    });
  }

  newSection(): FormGroup {
    return new FormGroup({
      sectionTitle: new FormControl(null),
      sectionDescription: new FormControl(null, Validators.required),
      sectionImage: new FormControl('https://source.unsplash.com/'),
    });
  }

  onAddQuote() {
    this.quotes.push(this.newQuote());
  }
  onAddSection() {
    this.sections.push(this.newSection());
  }

  onRemoveQuote(i: number) {
    this.quotes.removeAt(i);
  }
  onRemoveSection(i: number) {
    this.sections.removeAt(i);
  }

  openDialog() {
    this.dialog.open(DiscardDialog);
  }

  subject = new Subject<boolean>();

  // to guard against browser refresh, close, external link
  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    // insert logic to check if there are pending changes here;
    // returning true will navigate without confirmation
    // returning false will show a confirm dialog before navigating away
    if (
      this.blogRequiredFields.dirty ||
      this.blogText.dirty ||
      this.blogOptionalFields.dirty ||
      this.blogReview.dirty
    ) {
      return false;
    } else {
      return true;
    }
  }

  onSaveDraft() {
    console.log(this.blogRequiredFields.value);
    console.log(this.blogText.value);
    console.log(this.blogOptionalFields.value);
    console.log(this.blogReview.value);
  }

  onSubmit() {
    console.log('form submitted.');
    console.log(this.blogRequiredFields.value);
    console.log(this.blogText.value);
    console.log(this.blogOptionalFields.value);
    console.log(this.blogReview.value);
  }

  onCancel() {
    this.editMode = false;
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onUnpublish() {
    // change status to Draft
  }

  // Properties and methods for Tag chips
  addOnBlur = true;

  tags: BlogTag[] = [];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add tag
    if (value) {
      this.tags.push({ name: value });
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: BlogTag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  edit(tag: BlogTag, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove tag if it no longer has a name
    if (!value) {
      this.remove(tag);
      return;
    }

    // Edit existing tag
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags[index].name = value;
    }
  }
}

@Component({
  selector: 'discard-dialog',
  templateUrl: 'discard-dialog.html',
})
export class DiscardDialog {
  constructor(
    private edit: BlogEditComponent,
    public dialogRef: MatDialogRef<DiscardDialog>
  ) {}

  onCancel() {
    this.edit.subject.next(false);
    this.dialogRef.close();
  }
  onNavigate() {
    this.edit.subject.next(true);
    this.dialogRef.close();
    this.edit.blogRequiredFields.markAsPristine();
    this.edit.blogText.markAsPristine();
    this.edit.blogOptionalFields.markAsPristine();
    this.edit.blogReview.markAsPristine();
  }
}
