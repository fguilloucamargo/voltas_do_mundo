class PostsController < ApplicationController
  before_action :set_article, only: [:new, :edit, :update, :create, :destroy]
  before_action :set_post, only: [:edit, :update, :destroy]

  def new
    @post = Post.new
  end

  def create
    @post = Post.new(post_params)
    @post.user = current_user
    @post.article = @article
    if @post.save!
      redirect_to article_path(@article)
    else
      render :new
    end
  end

  def edit
  end

  def update
    @post.update(post_params)
    if @post.save!
      redirect_to article_path(@article)
    else
      render :edit
    end
  end

  def destroy
    @post.destroy
    redirect_to article_path(@article)
  end

  private

  def set_article
    @article = Article.find(params[:article_id])
  end

  def set_post
    @post = Post.find(params[:id])
  end

  def post_params
    params.require(:post).permit(:title, :text, :photo)
  end
end
