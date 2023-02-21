import { Component, HostListener, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BlogService } from '../blog/blog.service';

export interface BlogTag {
  name: string;
}

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css'],
})
export class BlogEditComponent implements OnInit {
  address: string;
  editMode = false;
  isLinear = false;
  blogRequiredFields: FormGroup;
  blogOptionalFields: FormGroup;
  blogReview: FormGroup;
  formFieldWidth: number;
  blogText: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private router: Router,
    private _formBuilder: FormBuilder
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
    let blogFeatured = false;
    let blogAddress = '';
    // other fields

    let blogImagePath = 'https://source.unsplash.com/';
    let blogQuotes = new FormArray([]);
    let blogCategory = '';
    let blogTags = new FormArray([]);

    if (this.editMode) {
      // prepopulate fields
    }

    // define the form template with 3 groups
    this.blogRequiredFields = this._formBuilder.group({
      title: new FormControl(blogTitle, Validators.required),
      description: new FormControl(blogDescription, Validators.required),
      featured: new FormControl(blogFeatured, Validators.required),
      address: new FormControl(blogAddress, Validators.required),
    });

    this.blogRequiredFields.get("title").valueChanges.subscribe((change)=>this.blogRequiredFields.get("address").setValue(change && change.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('-')));
    this.blogText = new FormGroup({
      sections: new FormArray([]),
    });



    this.blogOptionalFields = this._formBuilder.group({
      imagePath: new FormControl(blogImagePath),
      quotes: blogQuotes,
      category: new FormControl(blogCategory),
      tags: new FormControl(blogTags),
    });

    this.blogReview = this._formBuilder.group({
      thirdCtrl: ['', Validators.required],
    });
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

  onSaveDraft () {
    console.log(this.blogRequiredFields.value);
    console.log(this.blogText.value);
    console.log(this.blogOptionalFields.value);
    console.log(this.blogReview.value);
  }

  onSubmit() {
    console.log('form submitted.')
    console.log(this.blogRequiredFields.value);
    console.log(this.blogText.value);
    console.log(this.blogOptionalFields.value);
    console.log(this.blogReview.value);
  }

  onCancel() {
    this.editMode = false;
    this.router.navigate(['../'], { relativeTo: this.route });
  }

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
