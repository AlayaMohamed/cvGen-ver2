
import {
	Component,
	OnInit,
	ViewChild,
	Output,
	EventEmitter,
} from "@angular/core";
import { FormControl, FormGroup, Validators, NgForm } from "@angular/forms";

import { first } from "rxjs/operators";

import { Post } from "src/app/models/Post";

import { AuthService } from "src/app/services/auth.service";
import { PostService } from "src/app/services/post.service";

@Component({
	selector: 'app-builder',
	templateUrl: './builder.component.html',
	styleUrls: ['./builder.component.css']
})
export class BuilderComponent implements OnInit {

	@ViewChild("formDirective") formDirective: NgForm;
	@Output() create: EventEmitter<any> = new EventEmitter();

	form: FormGroup;

	isOpen = false;

	constructor(
		private authService: AuthService,
		private postService: PostService
	) { }

	ngOnInit(): void {
		this.form = this.createFormGroup();
	}

	createFormGroup(): FormGroup {
		return new FormGroup({


			name: new FormControl("", [
				Validators.required,
				Validators.minLength(5),
			]),
			 address: new FormControl("", [
				Validators.required,
				Validators.minLength(5),
			]),
			email: new FormControl("", [
				Validators.required,
				Validators.minLength(5),
			]),
			phone: new FormControl("", [
				Validators.required,
				Validators.minLength(5),
			]),
			employer: new FormControl("", [
				Validators.required,
				Validators.minLength(5),
			]),
			jobtitle: new FormControl("", [
				Validators.required,
				Validators.minLength(5),
			]),
			 jobdescription: new FormControl("", [
				Validators.required,
				Validators.minLength(5),
			]),
			experience: new FormControl("", [
				Validators.required,
				Validators.minLength(5),
			]),
			 diploma: new FormControl("", [
				Validators.required,
				Validators.minLength(5),
			]),
			diplomayear: new FormControl("", [
				Validators.required,
				Validators.minLength(5),
			])
		});
	}

	onSubmit(formData: Pick<Post, "title" | "body">): void {
		this.postService
			.createPost(formData, this.authService.userId)
			.pipe(first())
			.subscribe(() => {
				this.create.emit(null);
			});
		this.form.reset();
		this.formDirective.resetForm();
	}
}




