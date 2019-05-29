import { Post } from './post-model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class PostService {
	private posts: Post [] = [];
	private postsUpdated = new Subject<Post[]>();
	private http: HttpClient;

	constructor(http: HttpClient) {
		this.http = http;
	}

	// Returns a deep copied version of posts
	getPosts() {
		return [...this.posts];
	}

	getRounds() {
		return this.http.get('https://www.xn--rnvikfrisbeegolf-lxb.no/rounds/top10/1');
	}

	getPostUpdateListener() {
		return this.postsUpdated.asObservable();
	}

	addPosts(title: string, content: string) {
		const post: Post = {
			title,
			content
		};

		this.posts.push(post);
		this.postsUpdated.next(this.getPosts());
	}
}
