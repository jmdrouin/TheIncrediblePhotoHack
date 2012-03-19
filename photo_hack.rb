require 'rubygems'
require 'sinatra'
require "sinatra/reloader" if development?
#require 'sinatra/config_file'
require 'v8'
#require 'faraday'
require './eye_em_connector.rb'

#config_file 'config/services.yml'
#conn = Faraday.new(:url => 'https://www.eyeem.com/api/v2/', :params => {:client_id => settings.eyeem.client_id}

get '/' do
  eyeem = EyeEmConnector.new(ENV['EYEEM_CLIENT_ID'])
  @recommendations = eyeem.albums_recommended(:limit => 5)
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
  eyeem = EyeEmConnector.new(ENV['EYEEM_CLIENT_ID'])
  eyeem.album_photos(params[:album_id]).to_json
end

get '/search/eyeem/albums' do 
  content_type :json
  eyeem = EyeEmConnector.new(ENV['EYEEM_CLIENT_ID'])
  eyeem.albums(:q => params[:q], :limit => 5, :minPhotos => 10).to_json
end

get '/about' do
  erb :about
end

helpers do
  def partial(page, options={})
    erb page, options.merge!(:layout => false)
  end
end



