import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post-model';
import { PostService } from '../posts.service';
import { Subscription } from 'rxjs';

@Component({
  	selector: 'app-post-list',
  	templateUrl: './post-list.component.html',
  	styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

	posts: Post[] = [];
	postService: PostService;
	private postSub: Subscription;

  	constructor(postService: PostService) {
		this.postService = postService;
	}

  	ngOnInit() {
		this.posts = this.postService.getPosts();
		this.postSub = this.postService.getPostUpdateListener()
			.subscribe((posts: Post[]) => {
				this.posts = posts;
			});
	}

	ngOnDestroy() {
		this.postSub.unsubscribe();
	}

}
