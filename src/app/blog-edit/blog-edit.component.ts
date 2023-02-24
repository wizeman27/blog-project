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
import { Blog } from '../blog/blog.model';
import { BlogService } from '../blog/blog.service';
import { User } from '../user.model';
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
  blogAuthor: User;
  newPost: Blog;
  newBlogFeatured: boolean;
  formIsSubmitted = false;
  tagsToSave: string[] = [];
  protected blogCategories = ['Article', 'Essay', 'Short story', 'First draft'];
  protected blogFeaturedOptions = ['Yes', 'No'];
  protected blogMediaTypes = ['Image', 'Video', 'Audio'];

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
    this.blogAuthor = new User(
      'Hakim Mermer',
      'support@thekernelshop.com',
      'hakimm'
    );
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
              quotes: new FormControl(quote),
            })
          );
        }
      }
      if (blogPost['blogTags']) {
        for (let tag of blogPost.blogTags) {
          this.blogTags.push({ name: tag });
        }
      }
      if (blogPost['sections']) {
        for (let section of blogPost.sections) {
          blogSections.push(
            new FormGroup({
              sectionTitle: new FormControl(section.sectionTitle),
              sectionText: new FormControl(
                section.sectionText,
                Validators.required
              ),
              sectionMediaType: new FormControl(section.sectionMediaType),
              sectionMediaPath: new FormControl(section.sectionMediaPath),
              sectionMediaText: new FormControl(section.sectionMediaText),
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

    if(!this.editMode) {
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
    }

    this.blogText = new FormGroup({
      sections: blogSections,
    });

    this.blogOptionalFields = this._formBuilder.group({
      heroImage: new FormControl(blogHeroImage),
      quotes: blogQuotes,
      blogTags: new FormControl(blogTags),
    });

    // save tags array values if it's edited
    this.blogOptionalFields.get("blogTags").valueChanges.subscribe(
      (value: string[]) => {
        this.tagsToSave = value;
        console.log(value);
      }
    );


    this.blogReview = this._formBuilder.group({
      thirdCtrl: [''],
    });

    // Check if blog is already published

    if (this.editMode) {
      const blogPost = this.blogService.getBlog(this.address);
      this.isPublished = blogPost.status === 'Published';
    } else {
      this.isPublished = false;
    }
  }




  get sections() {
    return <FormArray>this.blogText.get('sections');
  }

  get quotes() {
    return <FormArray>this.blogOptionalFields.get('quotes');
  }

  newQuote():FormGroup {
    return new FormGroup({
      quotes: new FormControl(''),
    });
  }

  newSection(): FormGroup {
    return new FormGroup({
      sectionTitle: new FormControl(''),
      sectionText: new FormControl('', Validators.required),
      sectionMediaType: new FormControl(''),
      sectionMediaPath: new FormControl('https://source.unsplash.com/'),
      sectionMediaText: new FormControl(''),
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
      (this.blogRequiredFields.dirty ||
        this.blogText.dirty ||
        this.blogOptionalFields.dirty ||
        this.blogReview.dirty) &&
      !this.formIsSubmitted
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

    if (this.editMode) {
      //this.blogService.updateBlog(this.address, );
    } else {
      //this.blogService.newBlog();
    }
  }

  onSubmit() {
    const blogPost = this.blogService.getBlog(this.address);
    console.log('form submitted.');
    console.log(this.blogRequiredFields.value);
    console.log(this.blogText.value);
    console.log(this.blogOptionalFields.value);
    console.log(this.blogReview.value);

    // change featured field into boolean
    if (this.blogRequiredFields.value.featured === 'Yes') {
      this.newBlogFeatured = true;
    } else if (this.blogRequiredFields.value.featured === 'No') {
      this.newBlogFeatured = false;
    }
    // check if tags have been edited

    if(!this.blogOptionalFields.get("blogTags").dirty){
      this.tagsToSave = blogPost.blogTags;
    }

    // get comments if they exist
    let blogComments: Array<{
      commentText: string;
      commentAuthor: User;
      commentDate: Date;
    }>;

    if(this.editMode) {
      if (blogPost.comments) {
        blogComments = blogPost.comments;
      }
    }

    // format quotes before saving
    let quotesToSave: string[] = [] ;

    for (let quote of this.blogOptionalFields.value.quotes) {

      quotesToSave.push(quote.quotes);
    }

    console.log("Title:" +JSON.stringify(this.blogText.value.title));
    console.log("Sections:" +JSON.stringify(this.blogText.value.sections));
    console.log('Quotes: ' + JSON.stringify(this.blogOptionalFields.value.quotes));
    console.log('Tags: '+ JSON.stringify(this.blogOptionalFields.value.blogTags));

    this.newPost = new Blog(
      // We'll get the user info from auth component or local storage later
      this.blogAuthor,
      this.blogRequiredFields.value.title,
      this.blogRequiredFields.value.description,
      this.newBlogFeatured,
      new Date(),
      this.blogRequiredFields.value.address,
      this.blogRequiredFields.value.category,
      'Published',
      // sections are not correctly generated
      this.blogText.value.sections,
      this.blogOptionalFields.value.heroImage,
      // quotes are not correctly generated
      quotesToSave,
      blogComments,
      // tags are not correctly generated
      this.tagsToSave,
    );

    if (this.editMode) {
      this.blogService.updateBlog(this.address, this.newPost);
    } else {
      this.blogService.newBlog(this.newPost);
    }
    this.formIsSubmitted = true;
    this.onCancel();
  }

  onCancel() {
    this.editMode = false;
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onUnpublish() {
    // change post status to Draft
    const blogPost = this.blogService.getBlog(this.address);
    blogPost.status = 'Draft';
  }

  // Properties and methods for Tag chips
  addOnBlur = true;

  blogTags: BlogTag[] = [];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add tag
    if (value) {
      this.blogTags.push({ name: value });
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: BlogTag): void {
    const index = this.blogTags.indexOf(tag);

    if (index >= 0) {
      this.blogTags.splice(index, 1);
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
    const index = this.blogTags.indexOf(tag);
    if (index >= 0) {
      this.blogTags[index].name = value;
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
    if (this.edit.blogRequiredFields) {
      this.edit.blogRequiredFields.markAsPristine();
    }
    if (this.edit.blogText) {
      this.edit.blogText.markAsPristine();
    }
    if (this.edit.blogOptionalFields) {
      this.edit.blogOptionalFields.markAsPristine();
    }
    if (this.edit.blogReview) {
      this.edit.blogReview.markAsPristine();
    }
  }
}
