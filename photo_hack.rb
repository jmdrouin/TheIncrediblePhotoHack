require 'rubygems'
require 'sinatra'
require "sinatra/reloader" if development?
#require 'sinatra/config_file'
require 'v8'
require 'EyeEmConnector'

EyeEmConnector.configure do |config|
  config.client_id = ENV['EYEEM_CLIENT_ID']
end

get '/' do
  @recommendations = EyeEmConnector.albums_recommended(:limit => 5)
  erb :home
end

get '/eyeem' do
  params[:album_id] = 125363
  erb :photo_hack
end

get '/eyeem/:album_id' do
  erb :photo_hack
end

get '/photos/eyeem/:album_id' do 
  content_type :json
  eyeem = EyeEmConnector.album_photos(params[:album_id]).to_json
end

get '/search/eyeem/albums' do 
  content_type :json
  eyeem = EyeEmConnector.albums(:q => params[:q], :limit => 5, :minPhotos => 10).to_json
end

get '/about' do
  erb :about
end

helpers do
  def partial(page, options={})
    erb page, options.merge!(:layout => false)
  end
end



