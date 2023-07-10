class Api::V1::TodolistController < ApplicationController
  before_action :set_todolist, only: %i[ show destroy]
  def index
    todolist = Todolist.all
    render json: todolist
  end

  def create
    todolist = Todolist.create!(todolist_params)
    if todolist
      render json: todolist
    else
      render json: todolist.errors
    end
  end
  def update
    todo = Todolist.find(params[:id])
  if todo.update!(todolist_params)
  render json: { message: "Todo Item updated successfully" }
  else
  render json: { message: "An error occured" }
  end
  end
  def show
    render json: @todo
  end

  def destroy
    @todolist&.destroy
    render json:{ message: 'Todolist deleted'}
  end

  private

  def todolist_params
    params.permit(:title, :description, :completed)
  end

  def set_todolist
    @todo = Todo.find(params[:id])
  end
end
  
