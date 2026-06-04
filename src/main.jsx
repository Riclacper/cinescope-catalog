import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Calendar,
  ChevronDown,
  Clapperboard,
  Clock3,
  Heart,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
  Ticket,
  TrendingUp,
  X,
} from 'lucide-react';
import './styles.css';
import tmdbMovies from './tmdbMovies.json';

const catalog = [
  { title: 'Duna: Parte Dois', year: 2024, genre: 'Ficcao cientifica', duration: 166, rating: 8.6, maturity: '14', status: 'Em alta', director: 'Denis Villeneuve', cast: 'Timothee Chalamet, Zendaya, Rebecca Ferguson', description: 'Paul Atreides se une aos Fremen em uma jornada de vinganca, poder e destino nas areias de Arrakis.' },
  { title: 'Oppenheimer', year: 2023, genre: 'Drama', duration: 181, rating: 8.3, maturity: '16', status: 'Premiado', director: 'Christopher Nolan', cast: 'Cillian Murphy, Emily Blunt, Robert Downey Jr.', description: 'A trajetoria do fisico J. Robert Oppenheimer e o impacto humano, politico e cientifico do Projeto Manhattan.' },
  { title: 'Anatomia de uma Queda', year: 2023, genre: 'Suspense', duration: 152, rating: 7.7, maturity: '14', status: 'Critica', director: 'Justine Triet', cast: 'Sandra Huller, Swann Arlaud, Milo Machado-Graner', description: 'Uma escritora enfrenta julgamento publico e familiar depois da morte suspeita de seu marido.' },
  { title: 'Pobres Criaturas', year: 2023, genre: 'Fantasia', duration: 142, rating: 7.8, maturity: '18', status: 'Autor', director: 'Yorgos Lanthimos', cast: 'Emma Stone, Mark Ruffalo, Willem Dafoe', description: 'Bella Baxter descobre o mundo em uma fabula visual sobre autonomia, desejo e reinvencao.' },
  { title: 'Godzilla Minus One', year: 2023, genre: 'Acao', duration: 125, rating: 7.6, maturity: '12', status: 'Cult', director: 'Takashi Yamazaki', cast: 'Ryunosuke Kamiki, Minami Hamabe, Yuki Yamada', description: 'No Japao pos-guerra, uma nova ameaca colossal obriga sobreviventes a encarar trauma e reconstrucao.' },
  { title: 'A Zona de Interesse', year: 2023, genre: 'Historico', duration: 105, rating: 7.3, maturity: '14', status: 'Premiado', director: 'Jonathan Glazer', cast: 'Christian Friedel, Sandra Huller, Johann Karthaus', description: 'Uma familia constroi uma vida domestica perturbadora ao lado de Auschwitz, revelando horror pela rotina.' },
  { title: 'Vidas Passadas', year: 2023, genre: 'Romance', duration: 106, rating: 7.8, maturity: '12', status: 'Critica', director: 'Celine Song', cast: 'Greta Lee, Teo Yoo, John Magaro', description: 'Dois amigos de infancia se reencontram anos depois e revisitam escolhas, identidade e afeto.' },
  { title: 'Assassinos da Lua das Flores', year: 2023, genre: 'Crime', duration: 206, rating: 7.6, maturity: '16', status: 'Autor', director: 'Martin Scorsese', cast: 'Leonardo DiCaprio, Lily Gladstone, Robert De Niro', description: 'Uma sequencia de assassinatos contra a nacao Osage expoe ganancia, violencia e impunidade.' },
  { title: 'Parasita', year: 2019, genre: 'Suspense', duration: 132, rating: 8.5, maturity: '16', status: 'Premiado', director: 'Bong Joon Ho', cast: 'Song Kang-ho, Choi Woo-shik, Park So-dam', description: 'Uma familia pobre se infiltra na rotina de uma familia rica, expondo desigualdade e violencia social.' },
  { title: 'Tudo em Todo o Lugar ao Mesmo Tempo', year: 2022, genre: 'Ficcao cientifica', duration: 139, rating: 7.8, maturity: '14', status: 'Premiado', director: 'Daniel Kwan, Daniel Scheinert', cast: 'Michelle Yeoh, Ke Huy Quan, Stephanie Hsu', description: 'Uma imigrante sobrecarregada atravessa multiversos para reencontrar sentido, familia e identidade.' },
  { title: 'O Poderoso Chefao', year: 1972, genre: 'Crime', duration: 175, rating: 9.2, maturity: '16', status: 'Classico', director: 'Francis Ford Coppola', cast: 'Marlon Brando, Al Pacino, James Caan', description: 'A familia Corleone administra poder, lealdade e violencia no submundo da mafia americana.' },
  { title: 'O Poderoso Chefao: Parte II', year: 1974, genre: 'Crime', duration: 202, rating: 9.0, maturity: '16', status: 'Classico', director: 'Francis Ford Coppola', cast: 'Al Pacino, Robert De Niro, Diane Keaton', description: 'A ascensao de Vito Corleone e a consolidacao solitaria de Michael espelham duas geracoes de poder.' },
  { title: 'Um Sonho de Liberdade', year: 1994, genre: 'Drama', duration: 142, rating: 9.3, maturity: '16', status: 'Classico', director: 'Frank Darabont', cast: 'Tim Robbins, Morgan Freeman, Bob Gunton', description: 'Um banqueiro condenado por homicidio encontra amizade, paciencia e esperanca dentro de Shawshank.' },
  { title: 'A Lista de Schindler', year: 1993, genre: 'Historico', duration: 195, rating: 9.0, maturity: '16', status: 'Classico', director: 'Steven Spielberg', cast: 'Liam Neeson, Ben Kingsley, Ralph Fiennes', description: 'Oskar Schindler usa sua fabrica para salvar judeus durante o Holocausto.' },
  { title: '12 Homens e uma Sentenca', year: 1957, genre: 'Drama', duration: 96, rating: 9.0, maturity: '12', status: 'Classico', director: 'Sidney Lumet', cast: 'Henry Fonda, Lee J. Cobb, Martin Balsam', description: 'Um juri debate a culpa de um jovem e revela preconceitos, duvidas e responsabilidade civica.' },
  { title: 'Batman: O Cavaleiro das Trevas', year: 2008, genre: 'Acao', duration: 152, rating: 9.0, maturity: '14', status: 'Cult', director: 'Christopher Nolan', cast: 'Christian Bale, Heath Ledger, Aaron Eckhart', description: 'Batman enfrenta o Coringa em uma Gotham tomada por caos moral e criminal.' },
  { title: 'Pulp Fiction', year: 1994, genre: 'Crime', duration: 154, rating: 8.9, maturity: '18', status: 'Cult', director: 'Quentin Tarantino', cast: 'John Travolta, Uma Thurman, Samuel L. Jackson', description: 'Historias criminosas se cruzam em Los Angeles com humor acido, violencia e narrativa fragmentada.' },
  { title: 'Clube da Luta', year: 1999, genre: 'Drama', duration: 139, rating: 8.8, maturity: '18', status: 'Cult', director: 'David Fincher', cast: 'Edward Norton, Brad Pitt, Helena Bonham Carter', description: 'Um homem insone mergulha em uma organizacao clandestina que questiona consumo, identidade e controle.' },
  { title: 'Matrix', year: 1999, genre: 'Ficcao cientifica', duration: 136, rating: 8.7, maturity: '14', status: 'Cult', director: 'Lana Wachowski, Lilly Wachowski', cast: 'Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss', description: 'Um hacker descobre que a realidade pode ser uma simulacao controlada por maquinas.' },
  { title: 'A Origem', year: 2010, genre: 'Ficcao cientifica', duration: 148, rating: 8.8, maturity: '14', status: 'Cult', director: 'Christopher Nolan', cast: 'Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page', description: 'Especialistas invadem sonhos para plantar uma ideia em uma operacao de arquitetura mental.' },
  { title: 'Interestelar', year: 2014, genre: 'Ficcao cientifica', duration: 169, rating: 8.7, maturity: '10', status: 'Em alta', director: 'Christopher Nolan', cast: 'Matthew McConaughey, Anne Hathaway, Jessica Chastain', description: 'Astronautas buscam um novo lar para a humanidade enquanto tempo, amor e ciencia se entrelacam.' },
  { title: 'Os Bons Companheiros', year: 1990, genre: 'Crime', duration: 145, rating: 8.7, maturity: '18', status: 'Classico', director: 'Martin Scorsese', cast: 'Ray Liotta, Robert De Niro, Joe Pesci', description: 'A vida de Henry Hill revela seducao, paranoia e queda dentro da mafia.' },
  { title: 'Os Sete Samurais', year: 1954, genre: 'Acao', duration: 207, rating: 8.6, maturity: '12', status: 'Classico', director: 'Akira Kurosawa', cast: 'Toshiro Mifune, Takashi Shimura, Keiko Tsushima', description: 'Camponeses contratam guerreiros para defender sua aldeia de saqueadores.' },
  { title: 'A Viagem de Chihiro', year: 2001, genre: 'Animacao', duration: 125, rating: 8.6, maturity: 'Livre', status: 'Classico', director: 'Hayao Miyazaki', cast: 'Rumi Hiiragi, Miyu Irino, Mari Natsuki', description: 'Uma menina atravessa um mundo espiritual para salvar os pais e amadurecer.' },
  { title: 'Princesa Mononoke', year: 1997, genre: 'Animacao', duration: 134, rating: 8.3, maturity: '12', status: 'Classico', director: 'Hayao Miyazaki', cast: 'Yoji Matsuda, Yuriko Ishida, Yuko Tanaka', description: 'Homens, deuses e florestas entram em conflito em uma fantasia ecologica de grande escala.' },
  { title: 'Your Name', year: 2016, genre: 'Animacao', duration: 106, rating: 8.4, maturity: 'Livre', status: 'Cult', director: 'Makoto Shinkai', cast: 'Ryunosuke Kamiki, Mone Kamishiraishi, Ryo Narita', description: 'Dois adolescentes trocam de corpo misteriosamente e criam uma conexao afetiva alem do tempo.' },
  { title: 'Cidade de Deus', year: 2002, genre: 'Crime', duration: 130, rating: 8.6, maturity: '16', status: 'Classico', director: 'Fernando Meirelles, Katia Lund', cast: 'Alexandre Rodrigues, Leandro Firmino, Phellipe Haagensen', description: 'A ascensao do crime organizado em uma comunidade carioca e vista pelo olhar de um jovem fotografo.' },
  { title: 'Central do Brasil', year: 1998, genre: 'Drama', duration: 110, rating: 8.0, maturity: '12', status: 'Classico', director: 'Walter Salles', cast: 'Fernanda Montenegro, Vinicius de Oliveira, Marilia Pera', description: 'Uma ex-professora e um menino atravessam o Brasil em busca do pai dele.' },
  { title: 'Tropa de Elite', year: 2007, genre: 'Crime', duration: 115, rating: 8.0, maturity: '16', status: 'Cult', director: 'Jose Padilha', cast: 'Wagner Moura, Caio Junqueira, Andre Ramiro', description: 'Um capitao do BOPE enfrenta violencia urbana, corrupcao e desgaste psicologico.' },
  { title: 'Bacurau', year: 2019, genre: 'Suspense', duration: 131, rating: 7.3, maturity: '16', status: 'Autor', director: 'Kleber Mendonca Filho, Juliano Dornelles', cast: 'Sonia Braga, Udo Kier, Barbara Colen', description: 'Uma comunidade do sertao reage quando desaparece do mapa e passa a ser ameacada.' },
  { title: 'Aquarius', year: 2016, genre: 'Drama', duration: 146, rating: 7.4, maturity: '16', status: 'Autor', director: 'Kleber Mendonca Filho', cast: 'Sonia Braga, Maeve Jinkings, Humberto Carrao', description: 'Uma mulher resiste a pressao imobiliaria para manter seu apartamento e sua memoria.' },
  { title: 'Retratos Fantasmas', year: 2023, genre: 'Documentario', duration: 93, rating: 7.5, maturity: '10', status: 'Critica', director: 'Kleber Mendonca Filho', cast: 'Kleber Mendonca Filho, Maeve Jinkings, Sonia Braga', description: 'Cinemas de rua do Recife conduzem um ensaio sobre memoria urbana, imagens e transformacao.' },
  { title: 'Nomadland', year: 2020, genre: 'Drama', duration: 108, rating: 7.3, maturity: '12', status: 'Premiado', director: 'Chloe Zhao', cast: 'Frances McDormand, David Strathairn, Linda May', description: 'Uma mulher vive pelas estradas dos Estados Unidos apos perder trabalho, casa e cidade.' },
  { title: 'Moonlight', year: 2016, genre: 'Drama', duration: 111, rating: 7.4, maturity: '16', status: 'Premiado', director: 'Barry Jenkins', cast: 'Trevante Rhodes, Andre Holland, Mahershala Ali', description: 'Tres fases da vida de Chiron revelam afeto, masculinidade, identidade e sobrevivencia.' },
  { title: 'La La Land', year: 2016, genre: 'Musical', duration: 128, rating: 8.0, maturity: '12', status: 'Premiado', director: 'Damien Chazelle', cast: 'Ryan Gosling, Emma Stone, John Legend', description: 'Uma atriz e um musico se apaixonam enquanto perseguem sonhos em Los Angeles.' },
  { title: 'Whiplash', year: 2014, genre: 'Drama', duration: 107, rating: 8.5, maturity: '14', status: 'Cult', director: 'Damien Chazelle', cast: 'Miles Teller, J.K. Simmons, Melissa Benoist', description: 'Um jovem baterista enfrenta um instrutor abusivo em busca de excelencia musical.' },
  { title: 'Mad Max: Estrada da Furia', year: 2015, genre: 'Acao', duration: 120, rating: 8.1, maturity: '16', status: 'Cult', director: 'George Miller', cast: 'Tom Hardy, Charlize Theron, Nicholas Hoult', description: 'Furiosa e Max atravessam um deserto brutal em uma fuga de alta intensidade.' },
  { title: 'Blade Runner 2049', year: 2017, genre: 'Ficcao cientifica', duration: 164, rating: 8.0, maturity: '14', status: 'Cult', director: 'Denis Villeneuve', cast: 'Ryan Gosling, Harrison Ford, Ana de Armas', description: 'Um replicante investiga uma descoberta capaz de alterar a ordem entre humanos e maquinas.' },
  { title: 'Blade Runner', year: 1982, genre: 'Ficcao cientifica', duration: 117, rating: 8.1, maturity: '14', status: 'Classico', director: 'Ridley Scott', cast: 'Harrison Ford, Rutger Hauer, Sean Young', description: 'Um cacador de androides persegue replicantes fugitivos em uma Los Angeles futurista.' },
  { title: 'Alien, o Oitavo Passageiro', year: 1979, genre: 'Terror', duration: 117, rating: 8.5, maturity: '16', status: 'Classico', director: 'Ridley Scott', cast: 'Sigourney Weaver, Tom Skerritt, John Hurt', description: 'A tripulacao de uma nave enfrenta uma criatura letal em ambiente claustrofobico.' },
  { title: 'Aliens, o Resgate', year: 1986, genre: 'Acao', duration: 137, rating: 8.4, maturity: '14', status: 'Classico', director: 'James Cameron', cast: 'Sigourney Weaver, Michael Biehn, Carrie Henn', description: 'Ripley retorna ao planeta onde encontrou o xenomorfo, agora acompanhada por fuzileiros.' },
  { title: 'Terminator 2: O Julgamento Final', year: 1991, genre: 'Acao', duration: 137, rating: 8.6, maturity: '14', status: 'Classico', director: 'James Cameron', cast: 'Arnold Schwarzenegger, Linda Hamilton, Edward Furlong', description: 'Um androide protege John Connor de um exterminador avancado enviado do futuro.' },
  { title: 'Titanic', year: 1997, genre: 'Romance', duration: 195, rating: 7.9, maturity: '12', status: 'Classico', director: 'James Cameron', cast: 'Leonardo DiCaprio, Kate Winslet, Billy Zane', description: 'Um romance nasce a bordo do transatlantico que caminha para uma tragedia historica.' },
  { title: 'Avatar', year: 2009, genre: 'Ficcao cientifica', duration: 162, rating: 7.9, maturity: '12', status: 'Em alta', director: 'James Cameron', cast: 'Sam Worthington, Zoe Saldana, Sigourney Weaver', description: 'Um ex-fuzileiro se conecta ao povo Na vi em Pandora e questiona sua missao militar.' },
  { title: 'Gladiador', year: 2000, genre: 'Acao', duration: 155, rating: 8.5, maturity: '16', status: 'Classico', director: 'Ridley Scott', cast: 'Russell Crowe, Joaquin Phoenix, Connie Nielsen', description: 'Um general traido vira gladiador e busca vinganca contra o imperador de Roma.' },
  { title: 'Coringa', year: 2019, genre: 'Drama', duration: 122, rating: 8.4, maturity: '16', status: 'Cult', director: 'Todd Phillips', cast: 'Joaquin Phoenix, Robert De Niro, Zazie Beetz', description: 'Arthur Fleck mergulha em isolamento, violencia e colapso social em Gotham.' },
  { title: 'Taxi Driver', year: 1976, genre: 'Drama', duration: 114, rating: 8.2, maturity: '16', status: 'Classico', director: 'Martin Scorsese', cast: 'Robert De Niro, Jodie Foster, Cybill Shepherd', description: 'Um veterano solitario percorre Nova York enquanto sua alienacao se transforma em obsessao.' },
  { title: 'O Silencio dos Inocentes', year: 1991, genre: 'Suspense', duration: 118, rating: 8.6, maturity: '16', status: 'Classico', director: 'Jonathan Demme', cast: 'Jodie Foster, Anthony Hopkins, Scott Glenn', description: 'Uma agente do FBI consulta Hannibal Lecter para capturar um assassino em serie.' },
  { title: 'Seven: Os Sete Crimes Capitais', year: 1995, genre: 'Suspense', duration: 127, rating: 8.6, maturity: '18', status: 'Cult', director: 'David Fincher', cast: 'Brad Pitt, Morgan Freeman, Gwyneth Paltrow', description: 'Dois detetives perseguem um assassino que transforma pecados capitais em crimes elaborados.' },
  { title: 'Garota Exemplar', year: 2014, genre: 'Suspense', duration: 149, rating: 8.1, maturity: '14', status: 'Cult', director: 'David Fincher', cast: 'Ben Affleck, Rosamund Pike, Neil Patrick Harris', description: 'O desaparecimento de Amy Dunne desmonta uma narrativa publica sobre casamento e culpa.' },
  { title: 'A Rede Social', year: 2010, genre: 'Drama', duration: 120, rating: 7.8, maturity: '12', status: 'Critica', director: 'David Fincher', cast: 'Jesse Eisenberg, Andrew Garfield, Justin Timberlake', description: 'A criacao do Facebook e contada por meio de ambicao, traicoes e disputas judiciais.' },
  { title: 'Her', year: 2013, genre: 'Romance', duration: 126, rating: 8.0, maturity: '14', status: 'Cult', director: 'Spike Jonze', cast: 'Joaquin Phoenix, Scarlett Johansson, Amy Adams', description: 'Um homem solitario se apaixona por uma inteligencia artificial em um futuro proximo.' },
  { title: 'Ela Quer Tudo', year: 1986, genre: 'Comedia', duration: 84, rating: 6.8, maturity: '16', status: 'Autor', director: 'Spike Lee', cast: 'Tracy Camilla Johns, Tommy Redmond Hicks, John Canada Terrell', description: 'Nola Darling vive sua independencia afetiva em uma Nova York filmada com energia autoral.' },
  { title: 'Faca a Coisa Certa', year: 1989, genre: 'Drama', duration: 120, rating: 8.0, maturity: '14', status: 'Classico', director: 'Spike Lee', cast: 'Danny Aiello, Ossie Davis, Ruby Dee', description: 'Tensoes raciais crescem em um bairro do Brooklyn durante o dia mais quente do ano.' },
  { title: 'Corra!', year: 2017, genre: 'Terror', duration: 104, rating: 7.8, maturity: '14', status: 'Cult', director: 'Jordan Peele', cast: 'Daniel Kaluuya, Allison Williams, Catherine Keener', description: 'Um jovem visita a familia da namorada e descobre uma violencia racista cuidadosamente escondida.' },
  { title: 'Nos', year: 2019, genre: 'Terror', duration: 116, rating: 6.8, maturity: '16', status: 'Autor', director: 'Jordan Peele', cast: 'Lupita Nyongo, Winston Duke, Elisabeth Moss', description: 'Uma familia enfrenta versoes sombrias de si mesma em uma alegoria de terror social.' },
  { title: 'Nao! Nao Olhe!', year: 2022, genre: 'Ficcao cientifica', duration: 130, rating: 6.8, maturity: '14', status: 'Autor', director: 'Jordan Peele', cast: 'Daniel Kaluuya, Keke Palmer, Steven Yeun', description: 'Criadores de cavalos investigam um fenomeno no ceu ligado a espetaculo, perigo e exploracao.' },
  { title: 'O Labirinto do Fauno', year: 2006, genre: 'Fantasia', duration: 118, rating: 8.2, maturity: '16', status: 'Classico', director: 'Guillermo del Toro', cast: 'Ivana Baquero, Sergi Lopez, Maribel Verdu', description: 'Uma menina encontra um mundo fantastico enquanto vive sob a brutalidade da Espanha franquista.' },
  { title: 'A Forma da Agua', year: 2017, genre: 'Fantasia', duration: 123, rating: 7.3, maturity: '16', status: 'Premiado', director: 'Guillermo del Toro', cast: 'Sally Hawkins, Michael Shannon, Octavia Spencer', description: 'Uma zeladora muda cria uma relacao profunda com uma criatura mantida em laboratorio.' },
  { title: 'Roma', year: 2018, genre: 'Drama', duration: 135, rating: 7.7, maturity: '14', status: 'Premiado', director: 'Alfonso Cuaron', cast: 'Yalitza Aparicio, Marina de Tavira, Diego Cortina Autrey', description: 'A vida domestica de uma familia mexicana dos anos 1970 e observada pelo olhar de Cleo.' },
  { title: 'Gravidade', year: 2013, genre: 'Ficcao cientifica', duration: 91, rating: 7.7, maturity: '12', status: 'Premiado', director: 'Alfonso Cuaron', cast: 'Sandra Bullock, George Clooney, Ed Harris', description: 'Uma astronauta luta para sobreviver depois de um acidente devastador em orbita.' },
  { title: 'Filhos da Esperanca', year: 2006, genre: 'Ficcao cientifica', duration: 109, rating: 7.9, maturity: '16', status: 'Cult', director: 'Alfonso Cuaron', cast: 'Clive Owen, Julianne Moore, Michael Caine', description: 'Em um futuro infertil, um homem protege a primeira gravida vista em anos.' },
  { title: 'Birdman', year: 2014, genre: 'Drama', duration: 119, rating: 7.7, maturity: '16', status: 'Premiado', director: 'Alejandro G. Inarritu', cast: 'Michael Keaton, Emma Stone, Edward Norton', description: 'Um ator tenta reerguer sua carreira no teatro enquanto enfrenta ego, critica e passado.' },
  { title: 'O Regresso', year: 2015, genre: 'Aventura', duration: 156, rating: 8.0, maturity: '16', status: 'Premiado', director: 'Alejandro G. Inarritu', cast: 'Leonardo DiCaprio, Tom Hardy, Domhnall Gleeson', description: 'Um explorador abandonado apos ataque brutal atravessa a natureza em busca de sobrevivencia e vinganca.' },
  { title: 'Amores Brutos', year: 2000, genre: 'Drama', duration: 154, rating: 8.1, maturity: '18', status: 'Autor', director: 'Alejandro G. Inarritu', cast: 'Gael Garcia Bernal, Vanessa Bauche, Goya Toledo', description: 'Tres historias se cruzam na Cidade do Mexico depois de um acidente de carro.' },
  { title: 'Os Infiltrados', year: 2006, genre: 'Crime', duration: 151, rating: 8.5, maturity: '16', status: 'Premiado', director: 'Martin Scorsese', cast: 'Leonardo DiCaprio, Matt Damon, Jack Nicholson', description: 'Policia e mafia infiltram agentes um no outro em uma guerra de identidades falsas.' },
  { title: 'O Lobo de Wall Street', year: 2013, genre: 'Comedia', duration: 180, rating: 8.2, maturity: '18', status: 'Cult', director: 'Martin Scorsese', cast: 'Leonardo DiCaprio, Jonah Hill, Margot Robbie', description: 'A ascensao e queda de Jordan Belfort revelam excesso, fraude e cinismo financeiro.' },
  { title: 'Cassino', year: 1995, genre: 'Crime', duration: 178, rating: 8.2, maturity: '18', status: 'Classico', director: 'Martin Scorsese', cast: 'Robert De Niro, Sharon Stone, Joe Pesci', description: 'Negocios, violencia e ambicao corroem o controle da mafia sobre Las Vegas.' },
  { title: 'Era Uma Vez em Hollywood', year: 2019, genre: 'Comedia', duration: 161, rating: 7.6, maturity: '16', status: 'Autor', director: 'Quentin Tarantino', cast: 'Leonardo DiCaprio, Brad Pitt, Margot Robbie', description: 'Um ator e seu dublê circulam por uma Hollywood em transformacao no fim dos anos 1960.' },
  { title: 'Bastardos Inglorios', year: 2009, genre: 'Guerra', duration: 153, rating: 8.4, maturity: '18', status: 'Cult', director: 'Quentin Tarantino', cast: 'Brad Pitt, Christoph Waltz, Melanie Laurent', description: 'Vinganca, cinema e guerra se cruzam em uma fantasia historica contra o nazismo.' },
  { title: 'Django Livre', year: 2012, genre: 'Western', duration: 165, rating: 8.5, maturity: '18', status: 'Cult', director: 'Quentin Tarantino', cast: 'Jamie Foxx, Christoph Waltz, Leonardo DiCaprio', description: 'Um ex-escravizado se alia a um cacador de recompensas para resgatar sua esposa.' },
  { title: 'Kill Bill: Volume 1', year: 2003, genre: 'Acao', duration: 111, rating: 8.2, maturity: '18', status: 'Cult', director: 'Quentin Tarantino', cast: 'Uma Thurman, Lucy Liu, Vivica A. Fox', description: 'A Noiva inicia uma vinganca estilizada contra antigos aliados que tentaram mata-la.' },
  { title: 'O Grande Hotel Budapeste', year: 2014, genre: 'Comedia', duration: 99, rating: 8.1, maturity: '14', status: 'Autor', director: 'Wes Anderson', cast: 'Ralph Fiennes, Tony Revolori, Saoirse Ronan', description: 'Um concierge e seu jovem aprendiz se envolvem em roubo, heranca e fuga na Europa ficticia.' },
  { title: 'Moonrise Kingdom', year: 2012, genre: 'Comedia', duration: 94, rating: 7.8, maturity: '12', status: 'Autor', director: 'Wes Anderson', cast: 'Jared Gilman, Kara Hayward, Bruce Willis', description: 'Dois jovens apaixonados fogem em uma ilha, provocando uma busca cheia de excentricidade.' },
  { title: 'Ilha dos Cachorros', year: 2018, genre: 'Animacao', duration: 101, rating: 7.8, maturity: '10', status: 'Autor', director: 'Wes Anderson', cast: 'Bryan Cranston, Koyu Rankin, Edward Norton', description: 'Um garoto vai a uma ilha de quarentena para encontrar seu companheiro canino.' },
  { title: 'O Fabuloso Destino de Amelie Poulain', year: 2001, genre: 'Romance', duration: 122, rating: 8.3, maturity: '12', status: 'Cult', director: 'Jean-Pierre Jeunet', cast: 'Audrey Tautou, Mathieu Kassovitz, Rufus', description: 'Uma jovem parisiense interfere discretamente na vida de desconhecidos enquanto busca seu proprio amor.' },
  { title: 'Cinema Paradiso', year: 1988, genre: 'Drama', duration: 155, rating: 8.5, maturity: '10', status: 'Classico', director: 'Giuseppe Tornatore', cast: 'Philippe Noiret, Salvatore Cascio, Jacques Perrin', description: 'Um cineasta relembra a infancia, sua cidade natal e o projecionista que marcou sua vida.' },
  { title: 'A Vida e Bela', year: 1997, genre: 'Drama', duration: 116, rating: 8.6, maturity: '12', status: 'Classico', director: 'Roberto Benigni', cast: 'Roberto Benigni, Nicoletta Braschi, Giorgio Cantarini', description: 'Um pai usa humor e imaginacao para proteger o filho dos horrores de um campo nazista.' },
  { title: 'Os Intocaveis', year: 2011, genre: 'Comedia', duration: 112, rating: 8.5, maturity: '12', status: 'Em alta', director: 'Olivier Nakache, Eric Toledano', cast: 'Francois Cluzet, Omar Sy, Anne Le Ny', description: 'Um aristocrata tetraplegico e seu cuidador improvavel constroem uma amizade transformadora.' },
  { title: 'O Segredo dos Seus Olhos', year: 2009, genre: 'Suspense', duration: 129, rating: 8.2, maturity: '16', status: 'Premiado', director: 'Juan Jose Campanella', cast: 'Ricardo Darin, Soledad Villamil, Guillermo Francella', description: 'Um investigador aposentado revisita um caso de assassinato que marcou sua vida.' },
  { title: 'Relatos Selvagens', year: 2014, genre: 'Comedia', duration: 122, rating: 8.1, maturity: '16', status: 'Cult', director: 'Damian Szifron', cast: 'Ricardo Darin, Oscar Martinez, Erica Rivas', description: 'Seis historias exploram vinganca, colapso emocional e violencia cotidiana.' },
  { title: 'A Separacao', year: 2011, genre: 'Drama', duration: 123, rating: 8.3, maturity: '12', status: 'Premiado', director: 'Asghar Farhadi', cast: 'Payman Maadi, Leila Hatami, Sareh Bayat', description: 'Um divorcio no Ira coloca familia, religiao e verdade em um conflito moral complexo.' },
  { title: 'Drive', year: 2011, genre: 'Crime', duration: 100, rating: 7.8, maturity: '16', status: 'Cult', director: 'Nicolas Winding Refn', cast: 'Ryan Gosling, Carey Mulligan, Bryan Cranston', description: 'Um motorista reservado entra em uma espiral criminosa para proteger sua vizinha.' },
  { title: 'O Abutre', year: 2014, genre: 'Suspense', duration: 117, rating: 7.8, maturity: '16', status: 'Cult', director: 'Dan Gilroy', cast: 'Jake Gyllenhaal, Rene Russo, Riz Ahmed', description: 'Um cinegrafista independente explora acidentes e crimes para vender imagens chocantes a telejornais.' },
  { title: 'Os Suspeitos', year: 2013, genre: 'Suspense', duration: 153, rating: 8.2, maturity: '16', status: 'Cult', director: 'Denis Villeneuve', cast: 'Hugh Jackman, Jake Gyllenhaal, Viola Davis', description: 'O desaparecimento de duas meninas leva pais e policiais a limites morais perigosos.' },
  { title: 'A Chegada', year: 2016, genre: 'Ficcao cientifica', duration: 116, rating: 7.9, maturity: '10', status: 'Critica', director: 'Denis Villeneuve', cast: 'Amy Adams, Jeremy Renner, Forest Whitaker', description: 'Uma linguista tenta decifrar a comunicacao de visitantes alienigenas e repensa o tempo.' },
  { title: 'Sicario: Terra de Ninguem', year: 2015, genre: 'Crime', duration: 121, rating: 7.7, maturity: '16', status: 'Cult', director: 'Denis Villeneuve', cast: 'Emily Blunt, Benicio del Toro, Josh Brolin', description: 'Uma agente do FBI entra em uma operacao ambigua contra cartéis na fronteira.' },
  { title: 'O Grande Truque', year: 2006, genre: 'Suspense', duration: 130, rating: 8.5, maturity: '14', status: 'Cult', director: 'Christopher Nolan', cast: 'Christian Bale, Hugh Jackman, Scarlett Johansson', description: 'Dois magicos rivais sacrificam tudo para superar um ao outro no palco.' },
  { title: 'Amnesia', year: 2000, genre: 'Suspense', duration: 113, rating: 8.4, maturity: '16', status: 'Cult', director: 'Christopher Nolan', cast: 'Guy Pearce, Carrie-Anne Moss, Joe Pantoliano', description: 'Um homem com perda de memoria recente investiga o assassinato da esposa em ordem fragmentada.' },
  { title: 'Dunkirk', year: 2017, genre: 'Guerra', duration: 106, rating: 7.8, maturity: '14', status: 'Premiado', director: 'Christopher Nolan', cast: 'Fionn Whitehead, Tom Hardy, Mark Rylance', description: 'Soldados aliados tentam sobreviver a evacuacao de Dunkirk por terra, mar e ar.' },
  { title: 'Os Imperdoaveis', year: 1992, genre: 'Western', duration: 130, rating: 8.2, maturity: '16', status: 'Classico', director: 'Clint Eastwood', cast: 'Clint Eastwood, Gene Hackman, Morgan Freeman', description: 'Um pistoleiro aposentado aceita um ultimo trabalho e confronta o mito da violencia no Oeste.' },
  { title: 'Onde os Fracos Nao Tem Vez', year: 2007, genre: 'Crime', duration: 122, rating: 8.2, maturity: '16', status: 'Premiado', director: 'Joel Coen, Ethan Coen', cast: 'Josh Brolin, Javier Bardem, Tommy Lee Jones', description: 'Uma mala de dinheiro arrasta um homem para uma perseguicao fatal no Texas.' },
  { title: 'Fargo', year: 1996, genre: 'Crime', duration: 98, rating: 8.1, maturity: '16', status: 'Cult', director: 'Joel Coen, Ethan Coen', cast: 'Frances McDormand, William H. Macy, Steve Buscemi', description: 'Um plano de sequestro desastroso encontra a investigacao tranquila e firme de uma policial gravida.' },
  { title: 'O Grande Lebowski', year: 1998, genre: 'Comedia', duration: 117, rating: 8.1, maturity: '16', status: 'Cult', director: 'Joel Coen, Ethan Coen', cast: 'Jeff Bridges, John Goodman, Julianne Moore', description: 'Um homem relaxado e confundido com milionário e entra em uma trama absurda.' },
  { title: 'A Bruxa', year: 2015, genre: 'Terror', duration: 92, rating: 7.0, maturity: '16', status: 'Autor', director: 'Robert Eggers', cast: 'Anya Taylor-Joy, Ralph Ineson, Kate Dickie', description: 'Uma familia puritana isolada enfrenta paranoia, fe e horror nas margens da floresta.' },
  { title: 'O Farol', year: 2019, genre: 'Terror', duration: 109, rating: 7.4, maturity: '16', status: 'Autor', director: 'Robert Eggers', cast: 'Robert Pattinson, Willem Dafoe, Valeriia Karaman', description: 'Dois homens perdem controle e sanidade enquanto cuidam de um farol remoto.' },
  { title: 'Midsommar', year: 2019, genre: 'Terror', duration: 148, rating: 7.1, maturity: '18', status: 'Autor', director: 'Ari Aster', cast: 'Florence Pugh, Jack Reynor, Vilhelm Blomgren', description: 'Um grupo visita um festival sueco e descobre rituais cada vez mais perturbadores.' },
  { title: 'Hereditario', year: 2018, genre: 'Terror', duration: 127, rating: 7.3, maturity: '16', status: 'Cult', director: 'Ari Aster', cast: 'Toni Collette, Alex Wolff, Milly Shapiro', description: 'Uma familia enlutada revela segredos e forcas sinistras ligadas a sua linhagem.' },
  { title: 'Barbie', year: 2023, genre: 'Comedia', duration: 114, rating: 6.8, maturity: '12', status: 'Em alta', director: 'Greta Gerwig', cast: 'Margot Robbie, Ryan Gosling, America Ferrera', description: 'Barbie deixa seu mundo perfeito e encara identidade, consumo e expectativas no mundo real.' },
  { title: 'Adoraveis Mulheres', year: 2019, genre: 'Drama', duration: 135, rating: 7.8, maturity: '10', status: 'Critica', director: 'Greta Gerwig', cast: 'Saoirse Ronan, Emma Watson, Florence Pugh', description: 'As irmas March amadurecem entre ambicao artistica, amor, familia e independencia.' },
];

const palettes = [
  ['#15161a', '#d93f2f', '#f2b84b'],
  ['#101417', '#2f80ed', '#f8f3ea'],
  ['#18131d', '#8f4ad8', '#ffd166'],
  ['#111827', '#10b981', '#f9fafb'],
  ['#1f1512', '#f97316', '#fde68a'],
  ['#141414', '#64748b', '#f8fafc'],
  ['#18181b', '#e11d48', '#f4f4f5'],
  ['#0f172a', '#38bdf8', '#fefce8'],
];

function escapeSvg(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function splitTitle(title, maxLineLength = 18) {
  const words = title.split(' ');
  const lines = [];
  let currentLine = '';

  words.forEach((word) => {
    const nextLine = currentLine ? `${currentLine} ${word}` : word;
    if (nextLine.length > maxLineLength && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = nextLine;
    }
  });

  if (currentLine) lines.push(currentLine);
  return lines.slice(0, 4);
}

function svgDataUri(svg) {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function createPoster(movie, index) {
  const [base, accent, highlight] = palettes[index % palettes.length];
  const titleLines = splitTitle(movie.title).map(
    (line, lineIndex) => `<tspan x="42" y="${292 + lineIndex * 52}">${escapeSvg(line)}</tspan>`,
  );

  return svgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="480" height="720" viewBox="0 0 480 720">
      <defs>
        <linearGradient id="poster-bg-${index}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${base}"/>
          <stop offset="0.54" stop-color="${accent}"/>
          <stop offset="1" stop-color="#050505"/>
        </linearGradient>
      </defs>
      <rect width="480" height="720" fill="url(#poster-bg-${index})"/>
      <circle cx="400" cy="120" r="140" fill="${highlight}" opacity="0.16"/>
      <circle cx="78" cy="620" r="180" fill="#000" opacity="0.26"/>
      <rect x="30" y="30" width="420" height="660" rx="22" fill="none" stroke="rgba(255,255,255,0.28)" stroke-width="2"/>
      <text x="42" y="88" fill="${highlight}" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="800" letter-spacing="2">${escapeSvg(movie.genre.toUpperCase())}</text>
      <text fill="#fff8f0" font-family="Inter, Arial, sans-serif" font-size="43" font-weight="900" letter-spacing="0">${titleLines.join('')}</text>
      <text x="42" y="606" fill="#fff8f0" font-family="Inter, Arial, sans-serif" font-size="23" font-weight="800">${movie.year} • ${escapeSvg(movie.director)}</text>
      <text x="42" y="648" fill="${highlight}" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="900">★ ${movie.rating}</text>
    </svg>
  `);
}

function createBackdrop(movie, index) {
  const [base, accent, highlight] = palettes[index % palettes.length];

  return svgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
      <defs>
        <linearGradient id="backdrop-bg-${index}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${base}"/>
          <stop offset="0.62" stop-color="${accent}"/>
          <stop offset="1" stop-color="#050505"/>
        </linearGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#backdrop-bg-${index})"/>
      <circle cx="1240" cy="210" r="330" fill="${highlight}" opacity="0.12"/>
      <circle cx="210" cy="790" r="460" fill="#000" opacity="0.24"/>
      <text x="110" y="210" fill="${highlight}" font-family="Inter, Arial, sans-serif" font-size="36" font-weight="900" letter-spacing="4">${escapeSvg(movie.genre.toUpperCase())}</text>
      <text x="110" y="410" fill="#fff8f0" font-family="Inter, Arial, sans-serif" font-size="104" font-weight="900">${escapeSvg(movie.title)}</text>
      <text x="114" y="500" fill="#f5f2ec" font-family="Inter, Arial, sans-serif" font-size="38" font-weight="700">${movie.year} • ${escapeSvg(movie.director)} • ★ ${movie.rating}</text>
    </svg>
  `);
}

const tmdbByTitle = new Map(tmdbMovies.map((movie) => [movie.title, movie]));

const movies = catalog.map((movie, index) => {
  const tmdbMovie = tmdbByTitle.get(movie.title);

  return {
    ...movie,
    id: index + 1,
    year: tmdbMovie?.year ?? movie.year,
    rating: tmdbMovie?.rating ?? movie.rating,
    description: tmdbMovie?.overview ?? movie.description,
    image: tmdbMovie?.poster ?? createPoster(movie, index),
    backdrop: tmdbMovie?.backdrop ?? createBackdrop(movie, index),
  };
});

const genres = ['Todos', ...Array.from(new Set(movies.map((movie) => movie.genre)))];
const statusOptions = ['Todos', ...Array.from(new Set(movies.map((movie) => movie.status)))];
const itemsPerPage = 10;

function formatDuration(minutes) {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return `${hours}h ${rest}min`;
}

function App() {
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('Todos');
  const [status, setStatus] = useState('Todos');
  const [sort, setSort] = useState('rating');
  const [selectedMovie, setSelectedMovie] = useState(movies[0]);
  const [detailMovie, setDetailMovie] = useState(null);
  const [openFilter, setOpenFilter] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState(new Set([1, 4, 7]));

  const filteredMovies = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return movies
      .filter((movie) => {
        const matchesQuery =
          !normalizedQuery ||
          [movie.title, movie.director, movie.cast, movie.genre].some((item) =>
            item.toLowerCase().includes(normalizedQuery),
          );
        const matchesGenre = genre === 'Todos' || movie.genre === genre;
        const matchesStatus = status === 'Todos' || movie.status === status;

        return matchesQuery && matchesGenre && matchesStatus;
      })
      .sort((first, second) => {
        if (sort === 'year') return second.year - first.year;
        if (sort === 'duration') return second.duration - first.duration;
        return second.rating - first.rating;
      });
  }, [genre, query, sort, status]);

  const averageRating = (movies.reduce((sum, movie) => sum + movie.rating, 0) / movies.length).toFixed(1);
  const totalHours = Math.round(movies.reduce((sum, movie) => sum + movie.duration, 0) / 60);
  const totalPages = Math.max(1, Math.ceil(filteredMovies.length / itemsPerPage));
  const pageStart = (currentPage - 1) * itemsPerPage;
  const paginatedMovies = filteredMovies.slice(pageStart, pageStart + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [genre, query, sort, status]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    if (!detailMovie) return undefined;

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setDetailMovie(null);
      }
    }

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [detailMovie]);

  function toggleFavorite(movieId) {
    setFavorites((current) => {
      const next = new Set(current);
      if (next.has(movieId)) {
        next.delete(movieId);
      } else {
        next.add(movieId);
      }
      return next;
    });
  }

  function chooseFilter(type, value) {
    if (type === 'genre') {
      setGenre(value);
    } else {
      setStatus(value);
    }

    setOpenFilter(null);
  }

  return (
    <main className="app-shell">
      <section className="hero" style={{ backgroundImage: `url(${selectedMovie.backdrop})` }}>
        <div className="hero-overlay">
          <nav className="topbar" aria-label="Navegacao principal">
            <div className="brand">
              <span className="brand-mark">
                <Clapperboard size={22} />
              </span>
              <span>CineScope</span>
            </div>
            <div className="top-actions">
              <button className="icon-button" aria-label="Destaques">
                <Sparkles size={19} />
              </button>
              <button className="icon-button" aria-label="Ingressos">
                <Ticket size={19} />
              </button>
            </div>
          </nav>

          <div className="hero-content">
            <div className="hero-copy">
              <div className="eyebrow">
                <TrendingUp size={16} />
                <span>{selectedMovie.status}</span>
              </div>
              <h1>{selectedMovie.title}</h1>
              <p>{selectedMovie.description}</p>
              <div className="hero-meta">
                <span>
                  <Star size={16} fill="currentColor" />
                  {selectedMovie.rating}
                </span>
                <span>
                  <Calendar size={16} />
                  {selectedMovie.year}
                </span>
                <span>
                  <Clock3 size={16} />
                  {formatDuration(selectedMovie.duration)}
                </span>
                <span>{selectedMovie.maturity}+</span>
              </div>
              <div className="hero-actions">
                <button className="primary-button" onClick={() => setDetailMovie(selectedMovie)}>
                  Ver detalhes
                </button>
                <button
                  className="secondary-button"
                  onClick={() => toggleFavorite(selectedMovie.id)}
                  aria-pressed={favorites.has(selectedMovie.id)}
                >
                  <Heart size={18} fill={favorites.has(selectedMovie.id) ? 'currentColor' : 'none'} />
                  Favorito
                </button>
              </div>
            </div>

            <aside className="feature-panel" aria-label="Detalhes do filme destacado">
              <img src={selectedMovie.image} alt={`Poster de ${selectedMovie.title}`} />
              <div>
                <strong>{selectedMovie.director}</strong>
                <span>{selectedMovie.cast}</span>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="catalog-section">
        <div className="section-heading">
          <div>
            <span className="section-kicker">Acervo curado</span>
            <h2>Catalogo de filmes</h2>
          </div>
          <div className="stats" aria-label="Estatisticas do catalogo">
            <span>{movies.length} titulos</span>
            <span>{averageRating} media</span>
            <span>{totalHours}h totais</span>
          </div>
        </div>

        <div className="toolbar" aria-label="Filtros do catalogo">
          <label className="search-field">
            <Search size={18} />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar filme..."
            />
          </label>

          <div className="filter-group" aria-label="Filtro por genero">
            <div className="filter-label">
              <SlidersHorizontal size={16} />
              <span>Genero</span>
            </div>
            <button
              className="filter-trigger"
              onClick={() => setOpenFilter(openFilter === 'genre' ? null : 'genre')}
              type="button"
              aria-expanded={openFilter === 'genre'}
            >
              <span>{genre === 'Todos' ? 'Todos os generos' : genre}</span>
              <ChevronDown size={17} />
            </button>
            {openFilter === 'genre' && (
              <div className="filter-menu">
              {genres.map((item) => (
                <button
                  className={genre === item ? 'active' : ''}
                  key={item}
                  onClick={() => chooseFilter('genre', item)}
                  type="button"
                >
                  {item === 'Todos' ? 'Todos os generos' : item}
                </button>
              ))}
              </div>
            )}
          </div>

          <div className="filter-group" aria-label="Filtro por status">
            <div className="filter-label">
              <Sparkles size={16} />
              <span>Status</span>
            </div>
            <button
              className="filter-trigger"
              onClick={() => setOpenFilter(openFilter === 'status' ? null : 'status')}
              type="button"
              aria-expanded={openFilter === 'status'}
            >
              <span>{status === 'Todos' ? 'Todos os status' : status}</span>
              <ChevronDown size={17} />
            </button>
            {openFilter === 'status' && (
              <div className="filter-menu">
              {statusOptions.map((item) => (
                <button
                  className={status === item ? 'active' : ''}
                  key={item}
                  onClick={() => chooseFilter('status', item)}
                  type="button"
                >
                  {item === 'Todos' ? 'Todos os status' : item}
                </button>
              ))}
              </div>
            )}
          </div>

          <div className="segmented" aria-label="Ordenacao">
            <button className={sort === 'rating' ? 'active' : ''} onClick={() => setSort('rating')}>
              Nota
            </button>
            <button className={sort === 'year' ? 'active' : ''} onClick={() => setSort('year')}>
              Ano
            </button>
            <button className={sort === 'duration' ? 'active' : ''} onClick={() => setSort('duration')}>
              Duracao
            </button>
          </div>
        </div>

        <div className="movie-grid">
          {paginatedMovies.map((movie) => (
            <article
              className={movie.id === selectedMovie.id ? 'movie-card selected' : 'movie-card'}
              key={movie.id}
              onClick={() => {
                setSelectedMovie(movie);
                setDetailMovie(movie);
              }}
            >
              <button
                className="favorite-button"
                onClick={(event) => {
                  event.stopPropagation();
                  toggleFavorite(movie.id);
                }}
                aria-label={`Favoritar ${movie.title}`}
                aria-pressed={favorites.has(movie.id)}
              >
                <Heart size={17} fill={favorites.has(movie.id) ? 'currentColor' : 'none'} />
              </button>
              <img src={movie.image} alt={`Poster de ${movie.title}`} loading="lazy" />
              <div className="movie-info">
                <span>{movie.genre}</span>
                <h3>{movie.title}</h3>
                <div>
                  <span>{movie.year}</span>
                  <span>
                    <Star size={14} fill="currentColor" />
                    {movie.rating}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredMovies.length === 0 && (
          <div className="empty-state">
            <Clapperboard size={32} />
            <p>Nenhum filme encontrado para os filtros atuais.</p>
          </div>
        )}

        {filteredMovies.length > 0 && (
          <div className="pagination" aria-label="Paginacao do catalogo">
            <span>
              Mostrando {pageStart + 1}-{Math.min(pageStart + itemsPerPage, filteredMovies.length)} de{' '}
              {filteredMovies.length}
            </span>
            <div>
              <button disabled={currentPage === 1} onClick={() => setCurrentPage((page) => page - 1)} type="button">
                Anterior
              </button>
              <strong>
                {currentPage} / {totalPages}
              </strong>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((page) => page + 1)}
                type="button"
              >
                Proxima
              </button>
            </div>
          </div>
        )}

        <footer className="project-credits">
          <div className="credits-brand">
            <span>CineScope Catalog</span>
            <strong>Ricardo Lacerda Pereira</strong>
          </div>
          <div>
            <span>MENTOR</span>
            <strong>Marlon Santini</strong>
          </div>
          <div>
            <span>Dados e imagens</span>
            <strong>TMDb API</strong>
          </div>
          <div>
            <span>Tecnologias</span>
            <strong>React, Vite, Node.js e TMDb</strong>
          </div>
        </footer>
      </section>

      {detailMovie && (
        <div className="detail-overlay" role="presentation" onClick={() => setDetailMovie(null)}>
          <section
            className="detail-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="detail-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button className="detail-close" aria-label="Fechar detalhes" onClick={() => setDetailMovie(null)}>
              <X size={22} />
            </button>

            <div className="detail-media" style={{ backgroundImage: `url(${detailMovie.backdrop})` }}>
              <img src={detailMovie.image} alt={`Poster de ${detailMovie.title}`} />
            </div>

            <div className="detail-content">
              <div className="detail-kicker">
                <span>{detailMovie.status}</span>
                <span>{detailMovie.genre}</span>
              </div>
              <h2 id="detail-title">{detailMovie.title}</h2>
              <p>{detailMovie.description}</p>

              <div className="detail-meta" aria-label="Informacoes do filme">
                <span>
                  <Star size={16} fill="currentColor" />
                  {detailMovie.rating}
                </span>
                <span>
                  <Calendar size={16} />
                  {detailMovie.year}
                </span>
                <span>
                  <Clock3 size={16} />
                  {formatDuration(detailMovie.duration)}
                </span>
                <span>{detailMovie.maturity}+</span>
              </div>

              <div className="detail-credits">
                <div>
                  <strong>Direcao</strong>
                  <span>{detailMovie.director}</span>
                </div>
                <div>
                  <strong>Elenco</strong>
                  <span>{detailMovie.cast}</span>
                </div>
              </div>

              <div className="detail-actions">
                <button
                  className="secondary-button"
                  onClick={() => toggleFavorite(detailMovie.id)}
                  aria-pressed={favorites.has(detailMovie.id)}
                >
                  <Heart size={18} fill={favorites.has(detailMovie.id) ? 'currentColor' : 'none'} />
                  Favorito
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
