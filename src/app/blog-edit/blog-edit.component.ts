import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Injectable,
  OnInit,
} from '@angular/core';
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
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  defaultEditorExtensions,
  TuiEditorTool,
  TUI_EDITOR_CONTENT_PROCESSOR,
  TUI_EDITOR_EXTENSIONS,
} from '@taiga-ui/addon-editor';
//import { tuiPure } from '@taiga-ui/cdk';
import MarkdownIt from 'markdown-it';
//import { Converter } from 'showdown';
import { Observable, Subject } from 'rxjs';
import { BlogBody, BlogDraft, BlogMeta } from '../blog/blog.model';
import { BlogService } from '../blog/blog.service';
import { User } from '../shared/user.model';
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
  providers: [
    { provide: TUI_EDITOR_EXTENSIONS, useValue: defaultEditorExtensions },
    {
      provide: TUI_EDITOR_CONTENT_PROCESSOR,
      useValue: (markdown: string): string => new MarkdownIt().render(markdown),
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogEditComponent implements OnInit, ComponentCanDeactivate {
  readonly builtInTools = [
    TuiEditorTool.Undo,
    TuiEditorTool.Link,
    TuiEditorTool.Anchor,
    TuiEditorTool.Size,
    TuiEditorTool.Bold,
    TuiEditorTool.Italic,
    TuiEditorTool.Underline,
    TuiEditorTool.List,
    TuiEditorTool.HR,
    TuiEditorTool.Sub,
    TuiEditorTool.Sup,
    TuiEditorTool.Code,
    TuiEditorTool.Color,
    TuiEditorTool.Hilite,
  ];
  // @tuiPure
  // toMarkdown(html: string): string {
  //   return new Converter().makeMarkdown(html);
  // }

  blogHasDraft: boolean;
  previewMode: string = '';
  address: string;
  urlSection: string;
  editMode = false;
  draftEditMode = false;
  isLinear = false;
  blogRequiredFields: FormGroup;
  blogOptionalFields: FormGroup;
  //blogReview: FormGroup;
  formFieldWidth: number;
  blogText: FormGroup;
  isPublished: boolean;
  blogAuthor: User = new User(
    'Hakim Mermer',
    'support@thekernelshop.com',
    'hakimm'
  );
  //newPost: Blog;
  newBlogMeta: BlogMeta;
  newBlogBody: BlogBody;
  newBlogDraft: BlogDraft; // not sure if necessary
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
  blogMeta: BlogMeta;
  blogId: string;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private router: Router,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.address = params['address'];
      console.log(this.address);
      this.editMode =
        params['address'] !== null && params['address'] !== undefined;
      console.log(this.editMode);
      this.urlSection = this.route.snapshot['_routerState'].url;
      console.log(this.urlSection);
      console.log(this.urlSection.split('/')[2]);
      if (this.urlSection.split('/')[2] === 'edit-draft') {
        this.draftEditMode = true;
        console.log(this.draftEditMode);
      }

      if (this.editMode) {
        this.blogMeta = this.blogService.getBlogMeta(this.address);
        this.blogId = this.blogMeta.blogId;
      }
      this.initForm();
    });
    this.formFieldWidth = window.innerWidth * 0.8;
    console.log(this.formFieldWidth);
  }

  // this is causing an error, need to check
  // @HostListener('window:resize', ['$event'])
  // onResize(event) {
  //   this.formFieldWidth = window.innerWidth * 0.8;
  // }

  private initForm() {
    // meta fields
    let blogTitle = '';
    let blogDescription = '';
    let blogFeatured = '';
    let blogPostFeatured = ''; // what is this?
    let blogAddress = '';
    let blogCategory = '';
    let blogHeroImage = 'https://source.unsplash.com/';
    let blogTags = new FormArray([]);
    // other fields
    let blogQuotes = new FormArray([]);
    let blogSections = new FormArray([]);

    // load saved draft if it exists (when editing latest draft)
    if (this.editMode && this.draftEditMode) {
      const blogBody = this.blogService.getBlogBody(this.blogId);
      const blogDraft = this.blogService.getBlogDraft(this.blogId);

      //console.log(blogPost.draft.title);
      if (
        blogDraft.title !== undefined &&
        blogDraft.title !== '' &&
        blogDraft.title !== null
      ) {
        blogTitle = blogDraft.title;
      } else {
        blogTitle = this.blogMeta.title;
      }
      if (
        blogDraft.description !== undefined &&
        blogDraft.description !== '' &&
        blogDraft.description !== null
      ) {
        blogDescription = blogDraft.description;
      } else {
        blogDescription = this.blogMeta.description;
      }
      if (blogDraft.featured !== undefined && blogDraft.featured !== null) {
        if (blogDraft.featured) {
          blogPostFeatured = 'Yes';
        } else {
          blogPostFeatured = 'No';
        }
      } else {
        if (blogDraft) {
          blogPostFeatured = 'Yes';
        } else {
          blogPostFeatured = 'No';
        }
      }
      const featuredIndex = this.blogFeaturedOptions.indexOf(blogPostFeatured);
      blogFeatured = this.blogFeaturedOptions[featuredIndex];

      if (
        blogDraft.category !== undefined &&
        blogDraft.category !== '' &&
        blogDraft.category !== null
      ) {
        const categoryIndex = this.blogCategories.indexOf(blogDraft.category);
        blogCategory = this.blogCategories[categoryIndex];
      } else {
        const categoryIndex = this.blogCategories.indexOf(
          this.blogMeta.category
        );
        blogCategory = this.blogCategories[categoryIndex];
      }

      if (
        blogDraft.address !== undefined &&
        blogDraft.address !== '' &&
        blogDraft.address !== null
      ) {
        blogAddress = blogDraft.address;
      } else {
        blogAddress = this.blogMeta.address;
      }
      if (
        blogDraft.heroImage !== undefined &&
        blogDraft.heroImage !== '' &&
        blogDraft.heroImage !== null
      ) {
        blogHeroImage = blogDraft.heroImage;
      } else {
        blogHeroImage = this.blogMeta.heroImage;
      }

      if (blogDraft.quotes !== undefined && blogDraft.quotes !== null) {
        if (blogDraft['quotes']) {
          for (let quote of blogDraft.quotes) {
            blogQuotes.push(
              new FormGroup({
                quotes: new FormControl(quote),
              })
            );
          }
        }
      } else {
        if (blogBody['quotes']) {
          for (let quote of blogBody.quotes) {
            blogQuotes.push(
              new FormGroup({
                quotes: new FormControl(quote),
              })
            );
          }
        }
      }

      if (blogDraft.blogTags !== undefined && blogDraft.blogTags !== null) {
        if (blogDraft['blogTags']) {
          for (let tag of blogDraft.blogTags) {
            this.blogTags.push({ name: tag });
          }
        }
      } else {
        if (this.blogMeta['blogTags']) {
          for (let tag of this.blogMeta.blogTags) {
            this.blogTags.push({ name: tag });
          }
        }
      }

      if (blogDraft.sections !== undefined && blogDraft.sections !== null) {
        if (blogDraft['sections']) {
          for (let section of blogDraft.sections) {
            blogSections.push(
              new FormGroup({
                sectionTitle: new FormControl(section.sectionTitle),
                sectionText: new FormControl(section.sectionText),
                sectionMediaType: new FormControl(section.sectionMediaType),
                sectionMediaPath: new FormControl(section.sectionMediaPath),
                sectionMediaText: new FormControl(section.sectionMediaText),
                sectionMediaCredits: new FormControl(
                  section.sectionMediaCredits
                ),
              })
            );
          }
        }
      } else {
        if (blogBody['sections']) {
          for (let section of blogBody.sections) {
            blogSections.push(
              new FormGroup({
                sectionTitle: new FormControl(section.sectionTitle),
                sectionText: new FormControl(section.sectionText),
                sectionMediaType: new FormControl(section.sectionMediaType),
                sectionMediaPath: new FormControl(section.sectionMediaPath),
                sectionMediaText: new FormControl(section.sectionMediaText),
                sectionMediaCredits: new FormControl(
                  section.sectionMediaCredits
                ),
              })
            );
          }
        }
      }
    }

    // prepopulate fields in edit mode
    if (this.editMode && !this.draftEditMode) {
      const blogBody = this.blogService.getBlogBody(this.blogId);
      //console.log(blogPost.draft.title);
      blogTitle = this.blogMeta.title;
      blogDescription = this.blogMeta.description;
      // Display default value in select dropdown for Featured
      if (this.blogMeta.featured) {
        blogPostFeatured = 'Yes';
      } else {
        blogPostFeatured = 'No';
      }
      const featuredIndex = this.blogFeaturedOptions.indexOf(blogPostFeatured);
      blogFeatured = this.blogFeaturedOptions[featuredIndex];
      // Also Category dropdown
      const categoryIndex = this.blogCategories.indexOf(this.blogMeta.category);
      blogCategory = this.blogCategories[categoryIndex];
      blogAddress = this.blogMeta.address;
      blogHeroImage = this.blogMeta.heroImage;
      if (blogBody['quotes']) {
        for (let quote of blogBody.quotes) {
          blogQuotes.push(
            new FormGroup({
              quotes: new FormControl(quote),
            })
          );
        }
      }
      if (this.blogMeta['blogTags']) {
        for (let tag of this.blogMeta.blogTags) {
          this.blogTags.push({ name: tag });
        }
      }
      if (blogBody['sections']) {
        for (let section of blogBody.sections) {
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

    // this.blogReview = this._formBuilder.group({

    // });

    // Check if blog is already published

    if (this.editMode) {
      this.isPublished = this.blogMeta.status === 'Published';
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
      sectionMediaCredits: new FormControl(''),
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

    this.onSaveOrSubmit();
    this.blogDraft.blogId = this.blogId;
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

    console.log(this.editMode);
    console.log(this.isPublished);

    if (this.editMode) {
      if (this.isPublished) {
        // When editing a published post, keep main fields as is, save any changes to a draft
        this.blogService.updateBlogDraft(this.blogId, this.blogDraft);
      } else {
        // when editing a draft, we'll overwrite main fields
        this.newBlogMeta = new BlogMeta(
          this.blogMeta.author,
          this.blogRequiredFields.value.title,
          this.blogRequiredFields.value.description,
          this.newBlogFeatured,
          new Date(),
          this.blogRequiredFields.value.address,
          this.blogRequiredFields.value.category,
          'Draft',
          this.blogMeta.sourceLanguage,
          this.blogOptionalFields.value.heroImage,
          this.tagsToSave,
          this.blogMeta.blogId
        );
        this.newBlogBody = new BlogBody(
          this.blogMeta.blogId,
          this.blogText.value.sections,
          this.quotesToSave,
          this.blogComments
        );
        // this.newPost = new Blog(
        //   blogPost.author,
        //   this.blogRequiredFields.value.title,
        //   this.blogRequiredFields.value.description,
        //   this.newBlogFeatured,
        //   new Date(),
        //   this.blogRequiredFields.value.address,
        //   this.blogRequiredFields.value.category,
        //   'Draft',
        //   blogPost.sourceLanguage,
        //   this.blogText.value.sections,
        //   this.blogOptionalFields.value.heroImage,
        //   this.quotesToSave,
        //   this.blogComments,
        //   this.tagsToSave
        // );
        this.blogService.updateBlogMeta(this.blogId, this.newBlogMeta);

        this.blogService.updateBlogBody(this.blogId, this.newBlogBody);
      }
      // update the post meta or body or draft
      //this.blogService.updateBlog(this.address, this.newPost);
    } else {
      // when creating a new post, we'll overwrite main fields
      this.newBlogMeta = new BlogMeta(
        // We'll get the user info from auth component or localstorage later
        this.blogAuthor,
        this.blogRequiredFields.value.title,
        this.blogRequiredFields.value.description,
        this.newBlogFeatured,
        new Date(),
        this.blogRequiredFields.value.address,
        this.blogRequiredFields.value.category,
        'Draft',
        'en',
        this.blogOptionalFields.value.heroImage,
        this.tagsToSave,
        crypto.randomUUID()
      );
      this.newBlogBody = new BlogBody(
        this.newBlogMeta.blogId,
        this.blogText.value.sections,
        this.quotesToSave,
        this.blogComments
      );

      // this.newPost = new Blog(
      //   // We'll get the user info from auth component or localstorage later
      //   this.blogAuthor,
      //   this.blogRequiredFields.value.title,
      //   this.blogRequiredFields.value.description,
      //   this.newBlogFeatured,
      //   new Date(),
      //   this.blogRequiredFields.value.address,
      //   this.blogRequiredFields.value.category,
      //   'Draft',
      //   blogPost.sourceLanguage,
      //   this.blogText.value.sections,
      //   this.blogOptionalFields.value.heroImage,
      //   this.quotesToSave,
      //   this.blogComments,
      //   this.tagsToSave
      // );
      // create a new post
      this.blogService.newBlogMeta(this.newBlogMeta);
      this.blogService.newBlogBody(this.newBlogBody);
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
      console.log('Snackbar action was triggered!');
      snackBarRef.dismiss();
    });
  }

  onSaveOrSubmit() {
    // change featured field into boolean
    if (this.blogRequiredFields.value.featured === 'Yes') {
      this.newBlogFeatured = true;
    } else if (this.blogRequiredFields.value.featured === 'No') {
      this.newBlogFeatured = false;
    }
    // if tags have not been edited, keep the original array
    if (this.editMode) {
      if (!this.blogOptionalFields.get('blogTags').dirty) {
        this.tagsToSave = this.blogMeta.blogTags;
      }
    } else {
      this.tagsToSave = [];
    }
    // get comments if they exist
    if (this.editMode) {
      const blogBody = this.blogService.getBlogBody(this.blogId);
      if (blogBody.comments) {
        this.blogComments = blogBody.comments;
      }
    }
    // format quotes before saving
    for (let quote of this.blogOptionalFields.value.quotes) {
      this.quotesToSave.push(quote.quotes);
    }

    // if (this.blogText.get('sections').dirty) {
    //   for (let section of this.blogText.get('sections').value) {
    //     //section.sectionTitle.value = '';

    //   }
    // }
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
    let sourceLangToSave: string;

    if (this.editMode) {
      sourceLangToSave = this.blogMeta.sourceLanguage;
    } else {
      sourceLangToSave = 'en';
    }

    this.onSaveOrSubmit();

    if(this.editMode) {
      this.newBlogMeta = new BlogMeta(
        // We'll get the user info from auth component or localstorage later
        this.blogMeta.author,
        this.blogRequiredFields.value.title,
        this.blogRequiredFields.value.description,
        this.newBlogFeatured,
        new Date(),
        this.blogRequiredFields.value.address,
        this.blogRequiredFields.value.category,
        'Published',
        sourceLangToSave,
        this.blogOptionalFields.value.heroImage,
        this.tagsToSave,
        this.blogMeta.blogId
      );
    } else {
      this.newBlogMeta = new BlogMeta(

        this.blogAuthor,
        this.blogRequiredFields.value.title,
        this.blogRequiredFields.value.description,
        this.newBlogFeatured,
        new Date(),
        this.blogRequiredFields.value.address,
        this.blogRequiredFields.value.category,
        'Published',
        sourceLangToSave,
        this.blogOptionalFields.value.heroImage,
        this.tagsToSave,
        crypto.randomUUID(),
      );
    }

    this.newBlogBody = new BlogBody(
      this.newBlogMeta.blogId,
      this.blogText.value.sections,
      this.quotesToSave,
      this.blogComments
    );

    // this.newPost = new Blog(
    //   // We'll get the user info from auth component or local storage later
    //   this.blogAuthor,
    //   this.blogRequiredFields.value.title,
    //   this.blogRequiredFields.value.description,
    //   this.newBlogFeatured,
    //   new Date(),
    //   this.blogRequiredFields.value.address,
    //   this.blogRequiredFields.value.category,
    //   'Published',
    //   sourceLangToSave,
    //   this.blogText.value.sections,
    //   this.blogOptionalFields.value.heroImage,
    //   this.quotesToSave,
    //   this.blogComments,
    //   this.tagsToSave
    // );

    let snackMessage: string;
    if (this.editMode) {
      this.blogService.updateBlogMeta(this.blogId, this.newBlogMeta);
      this.blogService.updateBlogBody(this.blogId, this.newBlogBody);
      snackMessage = 'Your changes have been published.';
    } else {
      this.blogService.newBlogMeta(this.newBlogMeta);
      this.blogService.newBlogBody(this.newBlogBody);
      snackMessage = 'Your new post has been published.';
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
    this.blogMeta.status = 'Draft';
    this.blogService.blogsChanged.next(this.blogService.getBlogsMeta());
    this.blogService.featuredBlogsChanged.next(
      this.blogService.getFeaturedBlogsMeta()
    );

    let snackBarRef = this.snackBar.open(
      'Your post has been unpublished. You can continue editing the draft.',
      'OK',
      {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      }
    );
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

  onShowCardView() {
    this.onSaveDraft();
    this.previewMode = 'card';
  }
  onShowPanelView() {
    this.onSaveDraft();
    this.previewMode = 'panel';
  }
  onShowFullView() {
    this.onSaveDraft();
    this.previewMode = 'full';
  }
  onHidePreview() {
    this.previewMode = '';
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
  }
}
