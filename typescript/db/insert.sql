-- Created by @holgerthorup
-- Last modification date: 2017-07-12 10:19:37.17

-- session
INSERT INTO public.session (session) VALUES ('2015-16');
INSERT INTO public.session (session) VALUES ('2016-17');
INSERT INTO public.session (session) VALUES ('2017-18');

-- status
INSERT INTO public.status (status) VALUES ('1. behandling');
INSERT INTO public.status (status) VALUES ('2. behandling');
INSERT INTO public.status (status) VALUES ('3. behandling');

-- type
INSERT INTO public.type (type) VALUES ('Beslutningsforslag');
INSERT INTO public.type (type) VALUES ('Lovforslag');

-- tag
INSERT INTO public.tag (tag) VALUES ('Udlændinge');
INSERT INTO public.tag (tag) VALUES ('Integration');
INSERT INTO public.tag (tag) VALUES ('Opholdstilladelse');
INSERT INTO public.tag (tag) VALUES ('Flygtninge');
INSERT INTO public.tag (tag) VALUES ('Uddannelse');
INSERT INTO public.tag (tag) VALUES ('Videregående uddannelse');
INSERT INTO public.tag (tag) VALUES ('Sundhed');
INSERT INTO public.tag (tag) VALUES ('Rygning');

-- user
INSERT INTO public.user (firstname, lastname, email, pictureurl) VALUES ('John', 'Doe', 'test@initiativet.net', 'https://cdn4.iconfinder.com/data/icons/mayssam/512/user-128.png');
INSERT INTO public.user (firstname, lastname, email, pictureurl) VALUES ('Holger', 'Thorup', 'holgerthorup@gmail.com', 'https://scontent-arn2-1.xx.fbcdn.net/v/t31.0-8/18209234_10155133226904627_5911229942910571305_o.jpg?oh=a36408772e2390410b763b52aabe6a98&oe=59CC31BB');
INSERT INTO public.user (firstname, lastname, email, pictureurl) VALUES ('Sebastian', 'Winther', 'sebastianwinther@gmail.com', 'https://scontent-arn2-1.xx.fbcdn.net/v/t31.0-8/17359217_10210514983884287_8022929809590935477_o.jpg?oh=bf5adc31bdc206974832f13cdd1b42b1&oe=59C64683');

-- proposal
INSERT INTO public.proposal (ref, title, subtitle, type_id, session_id, status_id) VALUES ('L 154','Forslag til lov om ændring af udlændingeloven','Skærpelse af reglerne om tidsubegrænset opholdstilladelse',2,2,3);
INSERT INTO public.proposal (ref, title, subtitle, type_id, session_id, status_id) VALUES ('L 69','Forslag til lov om ændring af lov om adgangsregulering ved videregående uddannelser','Begrænsning af dobbeltuddannelse',2,2,3);
INSERT INTO public.proposal (ref, title, subtitle, type_id, session_id, status_id) VALUES ('B 41','Forslag til folketingsbeslutning om at legalisere cannabis i en 3-årig prøveperiode','Legalisering af cannabis i en 3-årig prøveperiode',1,2,1);

-- proposalTag_map
INSERT INTO public.proposalTag_map (proposal_id, tag_id) VALUES (1,1);
INSERT INTO public.proposalTag_map (proposal_id, tag_id) VALUES (1,2);
INSERT INTO public.proposalTag_map (proposal_id, tag_id) VALUES (1,3);
INSERT INTO public.proposalTag_map (proposal_id, tag_id) VALUES (1,4);
INSERT INTO public.proposalTag_map (proposal_id, tag_id) VALUES (2,5);
INSERT INTO public.proposalTag_map (proposal_id, tag_id) VALUES (2,6);
INSERT INTO public.proposalTag_map (proposal_id, tag_id) VALUES (3,7);
INSERT INTO public.proposalTag_map (proposal_id, tag_id) VALUES (3,8);

-- attachment
INSERT INTO public.attachment (title, url, proposal_id, sortOrder) VALUES ('Fremsættelsestale.pdf','http://www.ft.dk/ripdf/samling/20161/lovforslag/l154/20161_l154_fremsaettelsestale.pdf',1,1);
INSERT INTO public.attachment (title, url, proposal_id, sortOrder) VALUES ('Forslag som vedtaget.pdf','http://www.ft.dk/ripdf/samling/20161/lovforslag/l154/20161_l154_som_vedtaget.pdf',1,2);
INSERT INTO public.attachment (title, url, proposal_id, sortOrder) VALUES ('Fremsættelsestale.pdf','http://www.ft.dk/ripdf/samling/20161/lovforslag/l69/20161_l69_fremsaettelsestale.pdf',2,1);
INSERT INTO public.attachment (title, url, proposal_id, sortOrder) VALUES ('Forslag som vedtaget.pdf','http://www.ft.dk/ripdf/samling/20161/lovforslag/l69/20161_l69_som_vedtaget.pdf',2,2);
INSERT INTO public.attachment (title, url, proposal_id, sortOrder) VALUES ('Beslutningsforslag som fremsat.pdf','http://www.ft.dk/ripdf/samling/20161/beslutningsforslag/b41/20161_b41_som_fremsat.pdf',3,1);

-- article
INSERT INTO public.article (publisher, title, preview, imgURL, linkURL, proposal_id) VALUES ('www.dr.dk','OVERBLIK Balladen om uddannelsesloftet','Det sårkaldte uddannelsesloft ser nu ud til at blive justeret, blot halvanden måneds tid efter det at det blev vedtaget.','http://asset.dr.dk/ImageScaler/?file=%2Fimages%2Farticle%2F2016%2F12%2F20%2Fdownload_16.jpg&server=www.dr.dk','http://www.dr.dk/nyheder/politik/overblik-balladen-om-uddannelsesloftet',2);
INSERT INTO public.article (publisher, title, preview, imgURL, linkURL, proposal_id) VALUES ('www.information.dk','Regeringen vil indføre nødbremse for asylansøgere','Regeringen vil indføre en nødbremse, så asylansøgere kan afvises ved grænsen. Samtidig skal der ikke tages imod flere kvoteflygtninge i 2016.','https://www.information.dk/sites/all/modules/_inf/features/if_global_elements/images/og_default.png','https://www.information.dk/telegram/2016/08/regeringen-indfoere-noedbremse-asylansoegere-1',1);
INSERT INTO public.article (publisher, title, preview, imgURL, linkURL, proposal_id) VALUES ('www.fm.dk','Nødbremse: Afvisning af asylansøgere ved grænsen','Regeringen, Dansk Folkeparti, Liberal Alliance og Det Konservative Folkeparti er enige om, at der indføres en nødbremse i den danske udlændingelov.','https://www.fm.dk/~/media/images/temasites/finanslov-2017/graenseovergang.ashx?h=613&la=da&w=1100','https://www.fm.dk/temaer/finanslov-2017/noedbremse',1);
INSERT INTO public.article (publisher, title, preview, imgURL, linkURL, proposal_id) VALUES ('www.politiken.dk','Overblik: Forstå regeringens nødbremse – og hvorfor den skaber rødt morads','Regeringens nødbremse har skabt store røre, fordi også uledsagede asylbørn vil blive afvist. Få et overblik over, hvad der er op og ned her.','http://politiken.dk/incoming/img5710463.fqhk8a/ALTERNATES/p1x1_150/9f9e-anders-b-ksgaard-klumme','http://politiken.dk/indland/politik/art5884523/Forst%C3%A5-regeringens-n%C3%B8dbremse-%E2%80%93-og-hvorfor-den-skaber-r%C3%B8dt-morads',1);
INSERT INTO public.article (publisher, title, preview, imgURL, linkURL, proposal_id) VALUES ('www.dr.dk','Markante stramninger: Regeringen vil indføre nødbremse ved grænsen','Regeringen vil indføre en nødbremse, så asylansøgere kan afvises ved grænsen.','https://asset.dr.dk/imagescaler/?file=/images/other/2016/08/30/scanpix-20160614-161603-l.jpg&server=www.dr.dk&w=620&h=349&scaleAfter=crop&quality=75&ratio=16-9','https://www.dr.dk/nyheder/politik/markante-stramninger-regeringen-vil-indfoere-noedbremse-ved-graensen',1);
INSERT INTO public.article (publisher, title, preview, imgURL, linkURL, proposal_id) VALUES ('www.http://videnskab.dk/','Legalisering af hash: Hvad kan vi lære af udlandet?','I Danmark taler vi om at legalisere hash, men debatten er totalt blottet for erfaringer og fakta. Vidste du f.eks., at hash er ulovlig i Holland? Her leverer forskere fra fire lande fakta og fortæller om internationale erfaringer med at håndtere fri hash.','http://videnskab.dk/sites/default/files/styles/columns_12_12_desktop/public/article_media/hashryger_hoejre.jpg?itok=IgyN4EhV&timestamp=1479129383','http://videnskab.dk/kultur-samfund/legalisering-af-hash-hvad-kan-vi-laere-af-udlandet',3);
INSERT INTO public.article (publisher, title, preview, imgURL, linkURL, proposal_id) VALUES ('www.dr.dk','Legalisering af cannabis: Politikere og eksperter er rygende uenige','Fra "en ubetinget god idé" til "en forbrydelse mod børn og unge". Meningerne er legalisering af cannabis er mange.','http://asset.dr.dk/imagescaler/?file=/images/crop/2016/06/18/1466268127_scanpix-20160617-161033-l.jpg&server=www.dr.dk&w=620&h=349&scaleAfter=crop&quality=75&ratio=16-9','http://www.dr.dk/nyheder/indland/legalisering-af-cannabis-politikere-og-eksperter-er-rygende-uenige',3);
INSERT INTO public.article (publisher, title, preview, imgURL, linkURL, proposal_id) VALUES ('www.dr.dk','OVERBLIK Det mener partierne om legalisering af hash','Langt fra Borgen besøger i aften Christiania for at tale om løsninger på hashmarkedets problemer','http://asset.dr.dk/imagescaler/?file=/images/other/2016/10/20/scanpix-20160906-200446-4.jpg&server=www.dr.dk&w=620&h=349&scaleAfter=crop&quality=75&ratio=16-9','http://www.dr.dk/nyheder/indland/overblik-det-mener-partierne-om-legalisering-af-hash',3);
INSERT INTO public.article (publisher, title, preview, imgURL, linkURL, proposal_id) VALUES ('www.stofbladet.dk','Konsekvenser i et socialt perspektiv
ved brug af hash og alkohol ','Center for Rusmiddelforskning har i en stor ny undersøgelse set på unge, der misbruger rusmidler','http://www.stofbladet.dk/6storage/586/35/stof-logo-med-txt-2.jpg','http://www.stofbladet.dk/6storage/586/51/stof21.10-15.pdf',3);

-- articleVote
INSERT INTO public.articleVote (result, article_id, user_id) VALUES (true,1,1);
INSERT INTO public.articleVote (result, article_id, user_id) VALUES (false,1,2);
INSERT INTO public.articleVote (result, article_id, user_id) VALUES (false,1,3);
INSERT INTO public.articleVote (result, article_id, user_id) VALUES (true,2,1);
INSERT INTO public.articleVote (result, article_id, user_id) VALUES (true,2,2);
INSERT INTO public.articleVote (result, article_id, user_id) VALUES (false,2,3);
INSERT INTO public.articleVote (result, article_id, user_id) VALUES (true,3,1);
INSERT INTO public.articleVote (result, article_id, user_id) VALUES (true,3,2);
INSERT INTO public.articleVote (result, article_id, user_id) VALUES (true,3,3);
INSERT INTO public.articleVote (result, article_id, user_id) VALUES (true,4,1);
INSERT INTO public.articleVote (result, article_id, user_id) VALUES (false,4,2);
INSERT INTO public.articleVote (result, article_id, user_id) VALUES (false,4,3);
INSERT INTO public.articleVote (result, article_id, user_id) VALUES (true,5,1);
INSERT INTO public.articleVote (result, article_id, user_id) VALUES (true,5,2);
INSERT INTO public.articleVote (result, article_id, user_id) VALUES (false,5,3);
INSERT INTO public.articleVote (result, article_id, user_id) VALUES (true,6,1);
INSERT INTO public.articleVote (result, article_id, user_id) VALUES (true,6,2);
INSERT INTO public.articleVote (result, article_id, user_id) VALUES (true,6,3);
INSERT INTO public.articleVote (result, article_id, user_id) VALUES (true,7,1);
INSERT INTO public.articleVote (result, article_id, user_id) VALUES (false,7,2);
INSERT INTO public.articleVote (result, article_id, user_id) VALUES (false,7,3);
INSERT INTO public.articleVote (result, article_id, user_id) VALUES (true,8,1);
INSERT INTO public.articleVote (result, article_id, user_id) VALUES (true,8,2);
INSERT INTO public.articleVote (result, article_id, user_id) VALUES (false,8,3);
INSERT INTO public.articleVote (result, article_id, user_id) VALUES (true,9,1);
INSERT INTO public.articleVote (result, article_id, user_id) VALUES (true,9,2);
INSERT INTO public.articleVote (result, article_id, user_id) VALUES (true,9,3);

-- poll
INSERT INTO public.poll (due, proposal_id, status_id) VALUES ('03-23-2017',1,1);
INSERT INTO public.poll (due, proposal_id, status_id) VALUES ('05-02-2017',1,2);
INSERT INTO public.poll (due, proposal_id, status_id) VALUES ('05-04-2017',1,3);
INSERT INTO public.poll (due, proposal_id, status_id) VALUES ('11-24-2016',2,1);
INSERT INTO public.poll (due, proposal_id, status_id) VALUES ('12-16-2016',2,2);
INSERT INTO public.poll (due, proposal_id, status_id) VALUES ('12-19-2016',2,3);
INSERT INTO public.poll (due, proposal_id, status_id) VALUES ('12-16-2016',3,1);

-- pollVote
INSERT INTO public.pollVote (result, poll_id, user_id) VALUES (true,1,1);
INSERT INTO public.pollVote (result, poll_id, user_id) VALUES (false,1,2);
INSERT INTO public.pollVote (result, poll_id, user_id) VALUES (false,1,3);
INSERT INTO public.pollVote (result, poll_id, user_id) VALUES (true,2,1);
INSERT INTO public.pollVote (result, poll_id, user_id) VALUES (true,2,2);
INSERT INTO public.pollVote (result, poll_id, user_id) VALUES (false,2,3);
INSERT INTO public.pollVote (result, poll_id, user_id) VALUES (true,3,1);
INSERT INTO public.pollVote (result, poll_id, user_id) VALUES (true,3,2);
INSERT INTO public.pollVote (result, poll_id, user_id) VALUES (true,3,3);
INSERT INTO public.pollVote (result, poll_id, user_id) VALUES (true,4,1);
INSERT INTO public.pollVote (result, poll_id, user_id) VALUES (false,4,2);
INSERT INTO public.pollVote (result, poll_id, user_id) VALUES (false,4,3);
INSERT INTO public.pollVote (result, poll_id, user_id) VALUES (true,5,1);
INSERT INTO public.pollVote (result, poll_id, user_id) VALUES (true,5,2);
INSERT INTO public.pollVote (result, poll_id, user_id) VALUES (false,5,3);
INSERT INTO public.pollVote (result, poll_id, user_id) VALUES (true,6,1);
INSERT INTO public.pollVote (result, poll_id, user_id) VALUES (true,6,2);
INSERT INTO public.pollVote (result, poll_id, user_id) VALUES (true,6,3);
INSERT INTO public.pollVote (result, poll_id, user_id) VALUES (true,7,1);
INSERT INTO public.pollVote (result, poll_id, user_id) VALUES (true,7,2);
INSERT INTO public.pollVote (result, poll_id, user_id) VALUES (true,7,3);

-- parliamentVote
INSERT INTO public.parliamentVote (mandates, result, poll_id) VALUES (24,false,3);
INSERT INTO public.parliamentVote (mandates, result, poll_id) VALUES (88,true,3);
INSERT INTO public.parliamentVote (mandates, result, poll_id) VALUES (24,false,6);
INSERT INTO public.parliamentVote (mandates, result, poll_id) VALUES (79,true,6);

-- -- comment
-- INSERT INTO public.comment (comment, argument, proposal_id, user_id) VALUES ('Det er en de facto udmeldelse af Dublinforordningen, da ingen flygtninge kommer direkte til Danmark. Der er behov for et overordnet system i den her type situation med en fordelingsnøgle. Ikke at Danmark melder sig ud.',false,1,1);
-- INSERT INTO public.comment (comment, argument, proposal_id, user_id) VALUES ('Jeg synes det er en stor fejl og jeg tror det vil få flere og flere til at droppe ud af deres uddannelser hvis de ikke er 100% sikre. Af frygt for at de efterfølgende ikke kan tage den uddanelser de vil',false,2,1);
-- INSERT INTO public.comment (comment, argument, proposal_id, user_id) VALUES ('Det er pis',null,2,3);
-- INSERT INTO public.comment (comment, argument, proposal_id, user_id) VALUES ('Jeg mener ikke, at folkevalgt folketing, hvor størstedelen af de siddende har flere uddannelser, skal kunne tillade sig at sætte et loft. Viden er vores stærkeste ressource i Danmark, hvis vi vil konkurrere på det internationale marked, skal der ikke begrænses på uddannelse, tværtimod.',false,2,1);
-- INSERT INTO public.comment (comment, argument, proposal_id, user_id) VALUES ('Når man ser ud i verden, er noget af det som stortset alle andre lande værdsætter ved Danmark, netop: Vores universelle og gratis uddannelsessystem. Dét er vigtigt at værne om - især i en tid, hvor automatiseringen potentielt set vil gøre folk med lavt niveau af uddannelse overflødige på arbejdsmarkedet og det er ikke i orden. Arbejdsmarkedet skal kunne rumme alle og derfor er det vigtigt ikke at begrænse nogen i at uddanne sig så meget man ønsker. #Livslanglæring',false,2,3);
-- INSERT INTO public.comment (comment, argument, proposal_id, user_id) VALUES ('Jeg skal ikke bestemme, om folk vil ryge. Det er også bedre end bander skyder hinanden af den anledning',true,3,2);
-- INSERT INTO public.comment (comment, argument, proposal_id, user_id) VALUES ('Jeg mener, at der kun er fordele ved en legalisering af cannabissen. Staten har muligheden, for at få en ekstra indtægtskilde, at udrydde rockernes førende indtægtskilde samt håndtere afhængige ordenligt. Vi har nogle dygtige forskere på emnet, andre lande har vist vejen.',true,3,1);
-- INSERT INTO public.comment (comment, argument, proposal_id, user_id) VALUES ('Jeg har gennem længere tid ment, at cannbis burde legaliseres. Det giver ikke meget mening, at cannbis er forbudt men alkohol er lovligt. Det kunne også være dejligt, hvis man samtidig kom noget af kriminaliteten omkring cannbis til livs',true,3,3);
--
-- -- commentVote
-- INSERT INTO public.commentVote (result, comment_id, user_id) VALUES (true,1,1);
-- INSERT INTO public.commentVote (result, comment_id, user_id) VALUES (false,1,2);
-- INSERT INTO public.commentVote (result, comment_id, user_id) VALUES (false,1,3);
-- INSERT INTO public.commentVote (result, comment_id, user_id) VALUES (true,2,1);
-- INSERT INTO public.commentVote (result, comment_id, user_id) VALUES (true,2,2);
-- INSERT INTO public.commentVote (result, comment_id, user_id) VALUES (false,2,3);
-- INSERT INTO public.commentVote (result, comment_id, user_id) VALUES (true,3,1);
-- INSERT INTO public.commentVote (result, comment_id, user_id) VALUES (true,3,2);
-- INSERT INTO public.commentVote (result, comment_id, user_id) VALUES (true,3,3);
-- INSERT INTO public.commentVote (result, comment_id, user_id) VALUES (true,4,1);
-- INSERT INTO public.commentVote (result, comment_id, user_id) VALUES (false,4,2);
-- INSERT INTO public.commentVote (result, comment_id, user_id) VALUES (false,5,3);
-- INSERT INTO public.commentVote (result, comment_id, user_id) VALUES (true,6,1)v
-- INSERT INTO public.commentVote (result, comment_id, user_id) VALUES (true,6,2);
-- INSERT INTO public.commentVote (result, comment_id, user_id) VALUES (false,6,3);
-- INSERT INTO public.commentVote (result, comment_id, user_id) VALUES (true,7,1);
-- INSERT INTO public.commentVote (result, comment_id, user_id) VALUES (true,7,2);
-- INSERT INTO public.commentVote (result, comment_id, user_id) VALUES (true,8,3);
