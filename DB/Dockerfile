# Use the official MySQL image from Docker Hub
FROM mysql:5.7

# Environment variables for MySQL configuration
ENV MYSQL_ROOT_PASSWORD=${DB_ROOT_PASSWORD}
ENV MYSQL_DATABASE=${DB_NAME}
ENV MYSQL_USER=${DB_USER}
ENV MYSQL_PASSWORD=${DB_PASSWORD}

# Expose the MySQL port (default is 3306)
EXPOSE 3306
