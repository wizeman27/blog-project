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
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ActivatedRoute,
  Params,
  Router,
} from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Blog } from '../blog/blog.model';
import { BlogService } from '../blog/blog.service';
import { User } from '../user.model';
import { ComponentCanDeactivate } from './pending-changes.guard';

export interface BlogTag {
  name: string;
}
export interface BlogDraft {
  title?: string;
  description?: string;
  featured?: boolean;
  lastSavedDate?: Date;
  address?: string;
  category?: string;
  sections?: Array<{
    sectionTitle?: string;
    sectionText?: string;
    sectionMediaType?: string;
    sectionMediaPath?: string;
  }>;
  heroImage?: string;
  quotes?: Array<string>;
  blogTags?: Array<string>;
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
  blogHasDraft: boolean;
  address: string;
  urlSection: string;
  editMode = false;
  draftEditMode = false;
  isLinear = false;
  blogRequiredFields: FormGroup;
  blogOptionalFields: FormGroup;
  blogReview: FormGroup;
  formFieldWidth: number;
  blogText: FormGroup;
  isPublished: boolean;
  blogAuthor: User;
  newPost: Blog;
  blogDraft: BlogDraft = {};
  newBlogFeatured: boolean;
  formIsSubmitted = false;
  tagsToSave: string[] = [];
  quotesToSave: string[] = [];
  blogComments: Array<{
    commentText: string;
    commentAuthor: User;
    commentDate: Date;
  }>;
  protected blogCategories = ['Article', 'Essay', 'Short story', 'First draft'];
  protected blogFeaturedOptions = ['Yes', 'No'];
  protected blogMediaTypes = ['Image', 'Video', 'Audio'];

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private router: Router,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.address = params['address'];

      //console.log(this.address);
      this.editMode =
        params['address'] !== null && params['address'] !== undefined;
      console.log(this.editMode);
      this.urlSection = this.route.snapshot['_routerState'].url;
      //console.log(this.urlSection);
      //console.log(this.urlSection.split('/')[2]);
      if (this.urlSection.split('/')[2] === 'edit-draft') {
        this.draftEditMode = true;
        console.log(this.draftEditMode);
      }

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

    // load saved draft if it exists (when editing latest draft)
    if (this.editMode && this.draftEditMode) {
      const blogPost = this.blogService.getBlog(this.address);
      //console.log(blogPost.draft.title);
      if (
        blogPost.draft.title !== undefined &&
        blogPost.draft.title !== '' &&
        blogPost.draft.title !== null
      ) {
        blogTitle = blogPost.draft.title;
      } else {
        blogTitle = blogPost.title;
      }
      if (
        blogPost.draft.description !== undefined &&
        blogPost.draft.description !== '' &&
        blogPost.draft.description !== null
      ) {
        blogDescription = blogPost.draft.description;
      } else {
        blogDescription = blogPost.description;
      }
      if (
        blogPost.draft.featured !== undefined &&
        blogPost.draft.featured !== null
      ) {
        if (blogPost.draft.featured) {
          blogPostFeatured = 'Yes';
        } else {
          blogPostFeatured = 'No';
        }
      } else {
        if (blogPost.featured) {
          blogPostFeatured = 'Yes';
        } else {
          blogPostFeatured = 'No';
        }
      }
      const featuredIndex = this.blogFeaturedOptions.indexOf(blogPostFeatured);
      blogFeatured = this.blogFeaturedOptions[featuredIndex];

      if (
        blogPost.draft.category !== undefined &&
        blogPost.draft.category !== '' &&
        blogPost.draft.category !== null
      ) {
        const categoryIndex = this.blogCategories.indexOf(blogPost.draft.category);
        blogCategory = this.blogCategories[categoryIndex];
      } else {
        const categoryIndex = this.blogCategories.indexOf(blogPost.category);
      blogCategory = this.blogCategories[categoryIndex];
      }






      if (
        blogPost.draft.address !== undefined &&
        blogPost.draft.address !== '' &&
        blogPost.draft.address !== null
      ) {
        blogAddress = blogPost.draft.address;
      } else {
        blogAddress = blogPost.address;
      }
      if (
        blogPost.draft.heroImage !== undefined &&
        blogPost.draft.heroImage !== '' &&
        blogPost.draft.heroImage !== null
      ) {
        blogHeroImage = blogPost.draft.heroImage;
      } else {
        blogHeroImage = blogPost.heroImage;
      }

      if (
        blogPost.draft.quotes !== undefined &&
        blogPost.draft.quotes !== null
      ) {
        if (blogPost.draft['quotes']) {
          for (let quote of blogPost.draft.quotes) {
            blogQuotes.push(
              new FormGroup({
                quotes: new FormControl(quote),
              })
            );
          }
        }
      } else {
        if (blogPost['quotes']) {
          for (let quote of blogPost.quotes) {
            blogQuotes.push(
              new FormGroup({
                quotes: new FormControl(quote),
              })
            );
          }
        }
      }

      if (
        blogPost.draft.blogTags !== undefined &&
        blogPost.draft.blogTags !== null
      ) {
        if (blogPost.draft['blogTags']) {
          for (let tag of blogPost.draft.blogTags) {
            this.blogTags.push({ name: tag });
          }
        }
      } else {
        if (blogPost['blogTags']) {
          for (let tag of blogPost.blogTags) {
            this.blogTags.push({ name: tag });
          }
        }
      }

      if (
        blogPost.draft.sections !== undefined &&
        blogPost.draft.sections !== null
      ) {
        if (blogPost.draft['sections']) {
          for (let section of blogPost.draft.sections) {
            blogSections.push(
              new FormGroup({
                sectionTitle: new FormControl(section.sectionTitle),
                sectionText: new FormControl(section.sectionText),
                sectionMediaType: new FormControl(section.sectionMediaType),
                sectionMediaPath: new FormControl(section.sectionMediaPath),
                sectionMediaText: new FormControl(section.sectionMediaText),
              })
            );
          }
        }
      } else {
        if (blogPost['sections']) {
          for (let section of blogPost.sections) {
            blogSections.push(
              new FormGroup({
                sectionTitle: new FormControl(section.sectionTitle),
                sectionText: new FormControl(section.sectionText),
                sectionMediaType: new FormControl(section.sectionMediaType),
                sectionMediaPath: new FormControl(section.sectionMediaPath),
                sectionMediaText: new FormControl(section.sectionMediaText),
              })
            );
          }
        }
      }
    }

    // prepopulate fields
    if (this.editMode && !this.draftEditMode) {
      const blogPost = this.blogService.getBlog(this.address);
      //console.log(blogPost.draft.title);
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
              sectionText: new FormControl(section.sectionText),
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

    if (!this.editMode) {
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
    this.blogOptionalFields
      .get('blogTags')
      .valueChanges.subscribe((value: string[]) => {
        this.tagsToSave = value;
        //console.log(value);
      });

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

  newQuote(): FormGroup {
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
        this.blogOptionalFields.dirty) &&
      !this.formIsSubmitted
    ) {
      return false;
    } else {
      return true;
    }
  }

  onSaveDraft() {
    console.log('draft saved.');
    //console.log(this.blogRequiredFields.value);
    //console.log(this.blogText.value);
    //console.log(this.blogOptionalFields.value);
    //console.log(this.blogReview.value);
    const blogPost = this.blogService.getBlog(this.address);

    this.onSaveOrSubmit();
    // save changes to required fields
    if (this.blogRequiredFields.dirty) {
      if (this.blogRequiredFields.get('title').dirty) {
        this.blogDraft.title = this.blogRequiredFields.value.title;
      }
      if (this.blogRequiredFields.get('description').dirty) {
        this.blogDraft.description = this.blogRequiredFields.value.description;
      }
      if (this.blogRequiredFields.get('featured').dirty) {
        this.blogDraft.featured = this.newBlogFeatured;
      }
      if (this.blogRequiredFields.get('address').dirty) {
        this.blogDraft.address = this.blogRequiredFields.value.address;
      }
      if (this.blogRequiredFields.get('category').dirty) {
        this.blogDraft.category = this.blogRequiredFields.value.category;
      }
    }
    // save changes to blog text
    if (this.blogText.dirty) {
      this.blogDraft.sections = this.blogText.value.sections;
    }
    // save changes to optional fields
    if (this.blogOptionalFields.dirty) {
      if (this.blogOptionalFields.get('heroImage').dirty) {
        this.blogDraft.heroImage = this.blogOptionalFields.value.heroImage;
      }
      if (this.blogOptionalFields.get('quotes').dirty) {
        this.blogDraft.quotes = this.quotesToSave;
      }
      if (this.blogOptionalFields.get('blogTags').dirty) {
        this.blogDraft.blogTags = this.tagsToSave;
      }
    }
    // timestamp the draft
    this.blogDraft.lastSavedDate = new Date();

    if (this.editMode) {
      if (this.isPublished) {
        // When editing a published post, keep main fields as is, save any changes to draft field
        this.newPost = new Blog(
          blogPost.author,
          blogPost.title,
          blogPost.description,
          blogPost.featured,
          blogPost.publishedDate,
          blogPost.address,
          blogPost.category,
          blogPost.status,
          blogPost.sourceLanguage,
          blogPost.sections,
          blogPost.heroImage,
          blogPost.quotes,
          blogPost.comments,
          blogPost.blogTags,
          this.blogDraft
        );
      } else {
        // when editing a draft, we'll overwrite main fields
        this.newPost = new Blog(
          blogPost.author,
          this.blogRequiredFields.value.title,
          this.blogRequiredFields.value.description,
          this.newBlogFeatured,
          new Date(),
          this.blogRequiredFields.value.address,
          this.blogRequiredFields.value.category,
          'Draft',
          blogPost.sourceLanguage,
          this.blogText.value.sections,
          this.blogOptionalFields.value.heroImage,
          this.quotesToSave,
          this.blogComments,
          this.tagsToSave
        );
      }
      // update the post
      this.blogService.updateBlog(this.address, this.newPost);
    } else {
      // when creating a new post, we'll overwrite main fields
      this.newPost = new Blog(
        // We'll get the user info from auth component or localstorage later
        this.blogAuthor,
        this.blogRequiredFields.value.title,
        this.blogRequiredFields.value.description,
        this.newBlogFeatured,
        new Date(),
        this.blogRequiredFields.value.address,
        this.blogRequiredFields.value.category,
        'Draft',
        blogPost.sourceLanguage,
        this.blogText.value.sections,
        this.blogOptionalFields.value.heroImage,
        this.quotesToSave,
        this.blogComments,
        this.tagsToSave
      );
      // create a new post
      this.blogService.newBlog(this.newPost);
    }
    // mark form fields as pristine
    this.blogRequiredFields.markAsPristine();
    this.blogOptionalFields.markAsPristine();
    this.blogText.markAsPristine();
    //console.log(this.newPost);
    // show a snackbar confirming draft was saved

    let snackBarRef = this.snackBar.open(`Draft was saved.`, 'OK', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
    snackBarRef.onAction().subscribe(() => {
      console.log('The snackbar action was triggered!');
      snackBarRef.dismiss();
    });



  }

  onSaveOrSubmit() {
    const blogPost = this.blogService.getBlog(this.address);
    // change featured field into boolean
    if (this.blogRequiredFields.value.featured === 'Yes') {
      this.newBlogFeatured = true;
    } else if (this.blogRequiredFields.value.featured === 'No') {
      this.newBlogFeatured = false;
    }
    // if tags have not been edited, keep the original array
    if(this.editMode) {
      if (!this.blogOptionalFields.get('blogTags').dirty) {
        this.tagsToSave = blogPost.blogTags;
      }
    } else {
      this.tagsToSave = [];
    }
    // get comments if they exist
    if (this.editMode) {
      if (blogPost.comments) {
        this.blogComments = blogPost.comments;
      }
    }
    // format quotes before saving
    for (let quote of this.blogOptionalFields.value.quotes) {
      this.quotesToSave.push(quote.quotes);
    }
  }

  onSubmit() {
    console.log('form submitted.');
    //console.log(this.blogRequiredFields.value);
    //console.log(this.blogText.value);
    //console.log(this.blogOptionalFields.value);
    //console.log(this.blogReview.value);

    //console.log("Title:" +JSON.stringify(this.blogText.value.title));
    //console.log("Sections:" +JSON.stringify(this.blogText.value.sections));
    //console.log('Quotes: ' + JSON.stringify(this.blogOptionalFields.value.quotes));
    //console.log('Tags: '+ JSON.stringify(this.blogOptionalFields.value.blogTags));
    const blogPost = this.blogService.getBlog(this.address);

    let sourceLangToSave:string;

    if (this.editMode) {
      sourceLangToSave = blogPost.sourceLanguage;
    } else {
      sourceLangToSave = 'en';
    }

    this.onSaveOrSubmit();

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
      sourceLangToSave,
      this.blogText.value.sections,
      this.blogOptionalFields.value.heroImage,
      this.quotesToSave,
      this.blogComments,
      this.tagsToSave
    );

    let snackMessage: string;
    if (this.editMode) {
      this.blogService.updateBlog(this.address, this.newPost);
      snackMessage = "Your changes have been published.";
    } else {
      this.blogService.newBlog(this.newPost);
      snackMessage = "Your new post has been published.";
    }
    this.formIsSubmitted = true;
    //this.blogService.blogsChanged.next(this.blogService.getBlogs());
    //this.blogService.featuredBlogsChanged.next(this.blogService.getFeaturedBlogs());
    this.onCancel();
    // show a snackbar to confirm
    let snackBarRef = this.snackBar.open(snackMessage, 'OK', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
    snackBarRef.onAction().subscribe(() => {
      console.log('The snackbar action was triggered!');
      snackBarRef.dismiss();
    });
  }

  onCancel() {
    this.editMode = false;
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onUnpublish() {
    // change post status to Draft
    const blogPost = this.blogService.getBlog(this.address);
    blogPost.status = 'Draft';
    this.blogService.blogsChanged.next(this.blogService.getBlogs());
    this.blogService.featuredBlogsChanged.next(this.blogService.getFeaturedBlogs());

    let snackBarRef = this.snackBar.open('Your post has been unpublished. You can continue editing the draft.', 'OK', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
    snackBarRef.onAction().subscribe(() => {
      console.log('The snackbar action was triggered!');
      snackBarRef.dismiss();
    });
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
