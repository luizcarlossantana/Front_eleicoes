FROM nginx:1.15.0

RUN rm -rf /usr/share/nginx/html/*

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d

# Copie os arquivos do front-end para o diretório padrão do Nginx
COPY dist/nginx-teste/ /usr/share/nginx/html/
# Exponha a porta 80 (porta padrão do Nginx)
EXPOSE 80