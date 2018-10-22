class Api::V1::ReviewsController < ApplicationController
  before_action :authenticate_user!
  before_action :page_params, only: [:index]
  before_action :find_review, only: [:show, :destroy, :update]

  def index
    @reviews = Review.all.page(@page).per(@per_page)
    render json: @reviews
  end

  def show
    render json: @review
  end

  def create
    @review = current_user.reviews.build(review_params)
    if @review.save
      render json: {
        message: 'OK'
      }, status: 200
    else
      render json: {
        error: 'Something went wrong ...'
      }, status: 400
    end
  end

  def destroy
    if @review.user == current_user
      if @review.destroy
        render json: {
          message: 'Review deleted'
        }, status: 200
      else
        render json: {
          message: 'Something went wrong ...'
        }, status: 400
      end
    else
      render json: {
        message: 'Unauthorized'
      }, status: 401
    end
  end

  def update
    if @review.user == current_user
      if @review.update_attributes(review_params)
        render json: {
          message: 'Review updated'
        }, status: 200
      else
        render json: {
          message: 'Something went wrong ...'
        }, status: 400
      end
    else
      render json: {
        message: 'Unauthorized'
      }, status: 401
    end
  end

  private

  def review_params
    params.require(:review).permit(:anime_id, :title, :content, :rating)
  end

  def page_params
    @per_page = params[:item_per_page] || Settings.pagination
    @page = params[:page] || 1
  end

  def find_review
    @review = Review.find(params[:id])
  end
end
