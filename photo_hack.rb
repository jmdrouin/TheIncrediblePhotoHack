require 'rubygems'
require 'sinatra'
require "sinatra/reloader" if development?
require 'v8'

get '/' do
  params[:album_id] = 125363
  erb :photo_hack 
  
end

get '/svg.js' do
  coffee :svg 
  
end

get '/processing_tests' do
  erb :processing_tests
end


get '/svg' do
  erb :svg
end

get '/voronoi' do

  erb :voronoi 
  
end

get '/:album_id' do
  erb :photo_hack 
end