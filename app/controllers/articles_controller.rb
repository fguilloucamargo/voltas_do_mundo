class ArticlesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:home, :show, :about]
  before_action :set_article, only: [:show, :update, :destroy]

  def home
    @articles = Article.all
    @countries = @articles.map do |article|
      Geocoder.search(article.city).first.country
    end
    @countries.uniq!
    @markers = @articles.map do |article|
      {
        lat: article.geocode.first,
        lng: article.geocode.last,
        infoWindow: render_to_string(partial: "infowindow", locals: { article: article })
      }
    end
  end

  def show
    @article = Article.find(params[:id])
    @posts = Post.where(article: @article)
    @month = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
  end

  def new
    @article = Article.new
  end

  def create
    @article = Article.new(article_params)
    if @article.save!
      redirect_to article_path(@article)
    else
      render :new
    end
  end

  def update
    @article.update(article_params)
    if @article.save!
      redirect_to article_path(@article)
    else
      render :edit
    end
  end

  def destroy
    @article.destroy
    redirect_to root_path
  end

  def about
  end

  private

  def set_article
    @article = Article.find(params[:id])
  end

  def article_params
    params.require(:article).permit(:city, :year, :month)
  end
end
