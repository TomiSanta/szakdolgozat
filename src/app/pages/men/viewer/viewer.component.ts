import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Comment } from '../../../shared/models/Comment';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Image } from '../../../shared/models/Image';
import { MenService } from '../../../shared/services/men.service';
import { CommentService } from '../../../shared/services/comment.service';
import { UserService } from '../../../shared/services/user.service';
import { User } from '../../../shared/models/User';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit, OnChanges {
  @Input() imageInput?: Image;
  loadedImage?: string;
  user?: User;

  comments: Array<any> = [];

  commentsForm = this.createForm({
    id: '',
    username: '',
    comment: '',
    date: 0,
    imageId: this.imageInput?.id
  })

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    private menService: MenService,
    private commentService: CommentService,
    private userService: UserService
    ) {}

  ngOnChanges(): void {
    if (this.imageInput?.id){
      this.commentsForm.get('imageId')?.setValue(this.imageInput.id);
      this.menService.loadImage(this.imageInput.image_url).subscribe(data => {
        this.loadedImage = data;
      });
      this.commentService.getCommentsByImageId(this.imageInput.id).subscribe(comments => {
        this.comments = comments;
      })
    }   
  }

  decrease() {
    if (this.imageInput) {
      if (this.imageInput.count >= 2){
        this.imageInput.count =  this.imageInput.count - 1;
      }
      
    }
  }

  increase() {
    if (this.imageInput){
      this.imageInput.count += 1;
    }
  }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    this.userService.getById(user.uid).subscribe(data => {
      this.user = data;
      this.commentsForm.get('username')?.setValue(this.user?.username as string);
    }, error => {
      console.error(error);
    });
  }

  createForm(model: Comment) {
    let formGroup =  this.formBuilder.group(model);
    formGroup.get('username')?.addValidators([Validators.required]);
    formGroup.get('comment')?.addValidators([Validators.required, Validators.minLength(10)]);
    return formGroup;
  }

  addComment() {
    if (this.commentsForm.valid) {
      if (this.commentsForm.get('username') && this.commentsForm.get('comment')) {
        this.commentsForm.get('date')?.setValue(new Date().getTime());
        this.commentService.create(this.commentsForm.value as any).then(_ => {
          this.router.navigateByUrl('/men/successful/' + this.commentsForm.get('username')?.value);
        }).catch(error => {
          console.log(error);
        })
      }
    }
  }

  deleteComment(commentid: string, username: string) {
    if (username === this.user?.username) {
      this.commentService.delete(commentid);
    } else {
      console.error("Its not your comment, you can't delete is");
    }
  }

}
