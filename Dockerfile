FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy local frontend assets to the Nginx server directory
COPY index.html style.css script.js /usr/share/nginx/html/
COPY assets /usr/share/nginx/html/assets

# Expose port 80 for web traffic
EXPOSE 80

# Start Nginx in the foreground so the container stays active
CMD ["nginx", "-g", "daemon off;"]
