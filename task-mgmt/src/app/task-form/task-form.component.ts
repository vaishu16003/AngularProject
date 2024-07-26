import { Component } from '@angular/core';
import { Task } from '../models/task.model'; 
import { TaskService } from '../task.service'; 

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  task: Task = { title: '', description: '', completed: false };

  constructor(private taskService: TaskService) {}

  addTask(): void {
    this.taskService.addTask(this.task).subscribe(
      (newTask) => {
        console.log('Task added:', newTask);
        // Reset the form
        this.task = { title: '', description: '', completed: false };
        // Optionally, show a success message or provide user feedback
      },
      (error) => {
        console.error('Error adding task:', error);
        // Optionally, show an error message to the user
      }
    );
  }
}
