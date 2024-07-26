import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  selectedTask: Task | null = null;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(
      tasks => this.tasks = tasks,
      error => console.error('Error loading tasks:', error)
    );
  }

  toggleCompletion(id: number): void {
    this.taskService.getTask(id).subscribe(
      task => {
        if (task) {
          task.completed = !task.completed;
          this.taskService.updateTask(id, task).subscribe(
            () => this.loadTasks(),
            error => console.error('Error updating task:', error)
          );
        } else {
          console.error('Task not found');
        }
      },
      error => console.error('Error fetching task:', error)
    );
  }

  openUpdateForm(task: Task): void {
    this.selectedTask = { ...task };
  }

  closeUpdateForm(): void {
    this.selectedTask = null;
  }

  submitUpdate(): void {
    if (this.selectedTask && this.selectedTask.id !== undefined) {
      this.taskService.updateTask(this.selectedTask.id, this.selectedTask).subscribe(
        () => {
          this.loadTasks();
          this.closeUpdateForm();
        },
        error => console.error('Error updating task:', error)
      );
    } else {
      console.error('Task ID is undefined');
    }
  }
}
