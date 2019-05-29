import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PostService } from '../posts.service';

@Component({
	selector: 'app-post-create',
	templateUrl: './post-create.component.html',
	styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent {
	enteredTitle = '';
	enteredContent = '';

	postService: PostService;

	constructor(postService: PostService) {
		this.postService = postService;
	}

	onAddPost(form: NgForm) {

		if (form.invalid) {
			return;
		}

		this.postService.addPosts(form.value.title, form.value.content);

		this.postService.getRounds()
			.subscribe((data) => {
				console.log(data);
			});

		form.resetForm();
	}
}
