# Use a imagem Node.js como base
FROM node:20

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o arquivo package.json e o arquivo package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie todos os arquivos do diretório atual para o diretório de trabalho dentro do contêiner
COPY . .

# Construa o aplicativo React
RUN npm run build

# Exponha a porta 3000 para fora do contêiner (ou a porta que o Vite usa)
EXPOSE 5173

# Defina o comando padrão a ser executado quando o contêiner for iniciado
CMD ["npm", "run", "dev"]
