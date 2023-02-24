import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../user.model';
import { Blog } from './blog.model';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  blogsChanged = new Subject<Blog[]>();
  tagsChanged = new Subject<Set<string>>();
  featuredBlogsChanged = new Subject<Blog[]>();

  testUser: User = new User('Jack Tester', 'jack@tks.com', 'jacktester1');
  blogAuthor: User = new User(
    'Hakim Mermer',
    'hakim@thekernelshop.com',
    'hmermer'
  );

  private blogs: Blog[] = [
    new Blog(
      this.blogAuthor,
      'Rethinking Orientalism and the Politics of Orientalist Art',
      `The debate on Orientalism has proved to be fruitful in exposing the vitality of a critical determination of discourse within which the text –objects, words, images, and expressions—gains significance. Sadly though, Said’s critical approach to the issue is inevitably perceived as political, to differing extents. This article aims to critically read the traces of a constructed orientalist collective mind –abstracted from any particular era in history to cover all that is modern/postmodern about it—in the work of orientalist artists in 19th century, especially the realists. It also aims to clarify, or further develop on, Said’s definition of Orientalism as an “epistemological and ontological distinction between the West and the East.” (quoted in Yeğenoğlu, 1999: 6) to accentuate the incest relation of the Orient, the created western ‘other’, with the western ‘self’ and their more and more conspicuous similarity to each other. (see Baudrillard, 2001: 10)`,
      true,
      new Date('December 17, 2022 03:24:00'),
      'rethinking-orientalism-and-the-politics-of-orientalist-art',
      'Article',
      'Published',
      [
        {
          sectionTitle: 'Introduction',
          sectionText: `The debate on Orientalism has proved to be fruitful in exposing the vitality of a critical determination of discourse within which the text –objects, words, images, and expressions—gains significance. Sadly though, Said’s critical approach to the issue is inevitably perceived as political, to differing extents. This article aims to critically read the traces of a constructed orientalist collective mind –abstracted from any particular era in history to cover all that is modern/postmodern about it—in the work of orientalist artists in 19th century, especially the realists. It also aims to clarify, or further develop on, Said’s definition of Orientalism as an “epistemological and ontological distinction between the West and the East.” (quoted in Yeğenoğlu, 1999: 6) to accentuate the incest relation of the Orient, the created western ‘other’, with the western ‘self’ and their more and more conspicuous similarity to each other. (see Baudrillard, 2001: 10)
          “Hegel’s work was immense ... in its exceptional synthesis of the vision to which the West strove to subordinate the world.” (Hentsch, 1992: 140) The pioneer of modern western thought, Hegel’s philosophy of Geist, is a good presentation of the construction of the modernist subject –stereotyped as a free, rational European male- and its inherent contradiction. Nietzsche remarks that this subject is a synthetic concept whose willing supposedly suffices for action. (Nietzsche, 1983: 30) Hegel envisions ‘universality’ as attained through the coexistence of the master along with the slave and appears to promote cultural pluralism but at the end of Hegelian History, we see the ‘other’ losing its alterité. “Hegel explains God in terms of dynamism, a dynamism whose end point was Modern Europe.” (Hentsch, 1992: 141) In effect, no real alternative other is anymore tolerated within our understanding of reality. The synthetic subject has then created synthetic others and assimilated them.
          As a distinctly “western” ideal, universalism results in an increasing similarity for the ‘other’ and the ‘self’ in different ways. (Baudrillard, 2000: 120) In an imagined non-modernist context, the self and the other would be expected to interact as different realms of existence and meaning, separated with veils, symbolisms, and mysticisms. The synthetic subject of modernity does not tolerate such radical differences and through a puritanical praise of the ‘good’ and the ‘positive’ and a process of neat disinfection, the subject, as a moral agent, reduces itself and its created, or imagined, ‘other’ to the universal ground of the real, objective. (Baudrillard, 2000: 10-11)`,
          sectionMediaType: 'Image',
          sectionMediaPath: 'https://source.unsplash.com/NDtcHl4iDMY',
          sectionMediaText: 'Stacked oranges lol',
        },
        {
          sectionTitle: 'Realism for universalism',
          sectionText: `L’effet de réel, a literary concept introduced by Barthes, constitutes primarily of a loss of meaning, a referential delusion. (Barthes, 2006: 58) The modern search for what is merely objective, scientific, and universalizable results in a modern reality of physical matter, pure information and mere form void of meaning, significance, identity and symbol. (Guénon, 1990: 32) Realism, which Barthes considers to be just another new verisimilitude, relies on the ‘absolute’ –the universal—rather than the view of majority. (Barthes, 2006: 57) Within realism as a literary technique, absences function as presences through an insistence on viewing the text as a signifier with a hidden signified which is hors du texte. Kerbrat puts down the common principle of realism: “All text refers, sends back [renvoie], to a world (pre-constructed, or constructed by the text itself) left out of language.” (1982: 28) A mere reference to this hors du texte reality –an objective, and thus universal, reality—is considered sufficient for the text to be significant. Nietzsche explains us how the western mind came to leave the subject absent in such a realist act: “What did that god mean who counseled ‘know thyself!’? Does that perhaps mean: ‘Have no further concern with thyself! become objective!’” (Nietzsche, 1983: 74)
          Reading Orientalism from this perspective, we face a created image of ‘other’, one that is more and more similar rather than different. There are several motives leading to the creation of an ‘other.’ The synthetic subject looks for ways to avoid elaborating itself and exploring the ‘other’ allows it to suggest such an elaboration as trivial, thus rendering it more and more powerful. The ‘other’ness of this created image does not lie in its alterité. It is constituted of those parts of the self that need to be cleansed, controlled, repressed and denied any further existence. Through this process, it becomes a mere mirror image and when at the end the self vanishes, the other vanishes along with it and the postmodern individual looks for ways to reconstruct an identity from mere traces in a chaos that is universality. (Baudrillard, 2000: 14-16)
          “Said also emphasizes that Orientalism is an apparatus of knowledge with its will-to-truth.” (Yeğenoğlu, 1999: 26) The orientalist discourse makes use of, or rather produces, a ‘real’ Orient as the ground for its construction of an ‘other’. But the ‘reality’ in question is merely a reference to the material, and apparent, what is hors du texte divorced from meaning, symbol, and identity in the quest for universality. Realism is indeed one of the first signs of the assimilation –as in ‘similarity’- of the ‘other.’ A disastrous project as it pierces and tears down the veils of meaning to descend to a degree of existence where there are no more veils but pure chaos. This “chaos constitutes a border for what would perish in total void without it.” (Baudrillard, 2000: 15)`,
          sectionMediaType: 'Image',
          sectionMediaPath: 'https://cdn.kastatic.org/ka-perseus-images/b135e4fe83072e619b7b5556b8c0aa43cd1f0d6e.jpg',
          sectionMediaText: `Gustave Courbet, A Burial at Ornans, 1849-50, oil on canvas, 314 x 663 cm (Musee d'Orsay, Paris)`,
        },
        {
          sectionTitle: 'The picturesque as an aesthetic style',
          sectionText: `Along with the subject, location in space-time is almost vanished, or at best caricaturized, within the orientalist discourse. A sense of timelessness is conveyed through the paintings together with an emphasized immobility and this gives us the impression that the represented reality is either on the verge of rotting or that it has long perished. It is merely there as a mirage, or a picturesque expression of the artist’s confused and complex visions, not as a subject but rather as an individual of a shared socio-semiological reality. The adoption of the picturesque by most of the orientalist artists in 19th century is indeed remarkable and supports the hitherto exposed features of Orientalism.
          The picturesque was first recognized as an aesthetic category, in the mostly illustrative work of the 17th - 18th century travelling artists representing unexplored parts of the world to the western mind. “Picturesque travels were pleasant miscellanies, filled with cultured references that allowed the reader to link the unknown with the familiar.” It had an object or a motive “different from those related with science.” The expediting artist felt the need for “a way of assimilating this experience, of taming the unknown, of organizing the unstructured … a mediating instrument, one that readjusts reality according with predetermined canons.” The “new aesthetic category of the picturesque,” carefully distinguished from the classical categories of the ‘beautiful’ and the ‘sublime’, served as a context or a domain through which the unknown and exotic found its way into art. (Diener, 2007: 3-6)
          Although distinguished from a scientific gaze, an objectivism is present in academic orientalist painting through the photographic realism of the artist. Canonically, it has been seen as an attempt to document a fading civilization. “Those artists conscientiously sketched and painted innumerable aspects of oriental life and scenery, using photographs at times as an aide-memoire to insure accuracy.” (Needham, 1982: 339) Beneath the apparent claim of orientalist art to authenticity through realism –the almost fetishistic use of objects of curiosity, reliance on photographs, the minute fidelity in the depiction of material elements—lies the construction of a ‘reality’ torn apart from its significance and symbolism which is more likely to define the different (alternate) realm of the Orient. Any meaning conveyed in the representation can be credited as western, in particular bourgeois, male, and European.`,
        },
        {
          sectionTitle: 'Oriental as the female',
          sectionText: `Among the main subject matters of the so-called Oriental exotic and fantasy are violence, sexuality, the female and mystification at various levels. Edmondo de Amicis describes the women on the streets of Istanbul, in Constantinople as “white veiled figures in bright colored wrappers,” and wonders if they “are masquerades, or nuns, or mad women.” He is amazed to see them unaccompanied by men and reports “they seem to belong to no one, and to be all girls and widows, or members of some great association of the ‘ill-married.”” (Amicis, 1878: 206) “The veiled existence is the very truth of Oriental women; they seem to exist always in this deceptive manner … This metaphysical speculation or mediation, this desire to reveal and unveil is at the same time the scene of seduction. The metaphysical will to know gains a sexual overtone.” (Yeğenoğlu, 1999: 45)
          It shouldn’t be considered too daring to identify the Orient under the western gaze with the female. “In Orientalist writing, discourses of cultural and sexual differences are powerfully mapped onto each other.” remarks Yeğenoğlu. In fact, the Oriental is primarily a veil for the western; or rather it is the western ‘gaze’ that is enigmatic. He is anxious “by his lack of a true, fixed perspective; he can not position himself vis-à-vis them.” (Yeğenoğlu, 1999: 46) In his claim for universality, the western mind does not tolerate the idea that the veil might be covering some reality totally unknown to him, and exhausts such a possibility with associating it –the veil—with all that is obscure, unwanted, and ‘other’ized about his own self. This prevents the emergence of an attitude leading to a play with desire, and seduction. “At the turn of the 19th century, with romanticism, a masculine hysteria has penetrated the game and with it began the change of the sexual paradigm.” (Baudrillard, 2000: 46) Denying a harmonic play of the ‘self’ with its ‘other’, the orientalist discourse attempts to create its other. The veil in orientalist paintings is thus usually transparent and there is nothing but a female body that it does not truly conceal, but does reveal; one with no identity, meaning, or character of its own. This body only exists for its master, and so it is docile, submissive, and ‘real.’ The demystification of the other is made possible through l’effet de réel, and the taming picturesque style and thus, the created other is already assimilated.
          Nochlin, on her examination of Delacroix’s Death of Sardanapalus (1827-8), remarks that Orient is constructed as “a fantasy space onto which strong desires –erotic, sadistic, or both– could be projected” (Nochlin, 1989: 41) This “private fantasy did not exist in a vacuum, but in a particular social context which granted permission for as well as established the boundaries of certain kinds of behavior.” (Nochlin, 1989: 42) Indeed, “what he, [Delacroix], displays with such extraordinary power is the mirror of our repressed selves.” (Hentsch, 1992: 154) Another famous representation of the female in orientalist art is the slave, or ‘odalisque’. Gerome’s famous Slave Market (early 1860’s) invites the male viewer “sexually to identify with, yet morally distance himself from, his Oriental counterparts depicted within the objectively inviting yet racially distancing space of the painting.” (Nochlin, 1989: 45) Strikingly, Gerome has painted similar sceneries, using in turn the Roman Empire instead of the Orient as spatio-temporal context. This points out that the reference to an Oriental socio-political reality is indeed mostly trivial about orientalist painting.
          A comparison with Manet’s revolutionary Masked Ball at the Opera (1873-4) which presents another ‘flesh market’, inconveniently at home (behind the galleries of the Opera House), with the French nouveaux riches as buyers and the female flesh realistically presented in fancy dresses rather than au naturel may tell us a lot on the process of ‘other’ization and what really is ‘other’ized. (Nochlin, 1989: 45-47) “Those parts of the Self which are deemed unacceptable to the ego, for reasons of culture, personal history, religion etc. are repressed into the unconscious and as a result are subject to being projected on others: the external Other becomes a substitute for an unacknowledged internal Other.” (Čerkez, 2004: 3)
          The accentuation of lesbianism in orientalist paintings of Gerome (Moorish Bath) and Debat-Ponsan (The Massage, 1883) among others is a good example of how representations of homosexuality in orientalist fantasies can serve fairly heterosexual purposes. “Western heterosexual fantasies about lesbianism within the harem are a trope of orientalist discourse.” (Hayes, 2000: 32) The opposition of the active, ugly black woman and the passive beautiful white one that is obviously getting ready to be presented to her master strongly alludes to lesbianism, not as the counter-part of male homosexuality but as an element intensifying the constructed sexuality of the oriental female and thus increasing the male heterosexual desire for it.`,
          sectionMediaType: 'Image',
          sectionMediaPath: 'https://source.unsplash.com/2w891xh3VYg',
          sectionMediaText: 'Picturesque village path',
        },
        {
          sectionTitle: 'Fantasy for universalism',
          sectionText: `Fantasized desire with inevitable sexual overtones is indeed the main motive or will at play of Orientalism. Yeğenoğlu defines the ‘western subject’ in a “process of generation ... of coming into being” –‘westernizing’ which “consists in the fashioning of a historically specific fantasy whereby members imagine themselves as Western.” The fictive character of this position relies on an increasingly universal ‘reality’, as in material void of form, or symbol. The male fantasy associated with the veil of the female, i.e. the male gaze is attacked by Nietzsche, in his attempt to revise the western philosophy of truth as he understands it: “Today we consider it a matter of decency not to wish to see everything naked, or to be present at everything, or to understand and ‘know everything.’” (Nietzsche, 1974: 38)
          Riviere, considers the issue from a slightly different aspect. In his work “Womanliness as Masquerade” he perceives two aspects of the term ‘masquerade’: a male’s representation and how this representation constitutes the female identity. A veil constantly surrounds the feminine, and our attempt to build a subjectivity loses its grounds in meaning and symbol to totally fall into the darkness of chaos, in the end. (Yeğenoğlu, 1999: 53-55) Accordingly, the fictitious character of modernity, despite their apparent tension, goes along with universality and ‘reality’; unfortunately this harmonious path leads to the unwelcomed end of a total loss of identity and meaning, and ends in pure chaos, at the verge of vanishing.
          This deconstructive process suggested by the creation of the western subject is indeed appealing and is exemplified by the photographic realism of academic Orientalism. Tracing this style further in time, we encounter such approaches as academic and documentary photography, most famously branded by The National Geographic Society. Malek Alloula, in his remarkable work, The Colonial Harem, presents us with a closer relative: orientalist postcards. The similarity of this genre to orientalist paintings is not merely constituted by the supposed common use of photography as an aide-memoire ensuring accuracy, but rather the entire process of deconstruction and reconstruction –the studio work, the collection of curious, exotic objects, the modeling, and what not.
          Barthes explains us a distinctive practicality-based feature of photography affecting its epistemic structures: “It is not impossible to perceive the signifier … but it requires a secondary action of knowledge or of reflection.” (quoted in Alloula, 2003: 27) The modeling, extensive studio work, and the photographer’s actual instructions to improve the atmosphere conveyed are expected to compensate for the weakness of the theme and the poverty of the imagination. (Alloula, 2003: 28-36) It is a process aiming at nourishing the material ‘reality’ in the absence of coherent meaning and significance.
          The process indispensable for orientalist painters is similar in character, and as such it produces what is popular. The intervention of the buyer, especially considering most of those paintings are indeed executed in Europe and the impossibility to exclude the artist’s individuality from the epistemic realm of the western almost inevitably yield to the production of the popular. Nochlin remarks, “[a]s such, their strategies of concealment lend themselves admirably to the critical methodologies, the deconstructive techniques now employed by the best film historians, or by sociologists of advertising imagery, or by analysts of visual propaganda, rather than those of mainstream art history.” (Nochlin, 1989: 57)`,
          sectionMediaType: 'Image',
          sectionMediaPath: 'https://cdn.kastatic.org/ka-perseus-images/d8809cd940cf0ad156eb12d605610a0f59e7d91b.jpg',
          sectionMediaText: `Gustave Courbet, A Burial at Ornans, 1849-50, oil on canvas, 314 x 663 cm (Musee d'Orsay, Paris)`,
        },
        {
          sectionTitle: 'Conclusion',
          sectionText: `This paper was intended to follow the general outline constructed by Linda Nochlin in her famous 1983 article The Imaginary Orient, and improve upon her perception of Orientalism inspired by Said’s critical approach in her attempt to re-politicize art history. I have dared to include diverse perspectives ranging from post-structuralism, deconstructionist theory, feminist theory, to psychoanalytic reading to be able to perceive how Orientalism functions from different points of view and how it is not a readily constructed attitude but rather a changing one, one doomed to eternal darkness and one trying to escape from this fate. Nietzsche’s critique of modernity has been given emphasis in part for the strikingly accurate oppositions it brings. Nietzsche, for instance, suggests we stop imagining an “Eternal Feminine”, or trying to know her and the remedy he proposes is his famous principle of amor fati.
          Orientalism is better understood to be about the westernization of the western subject. It is, in essence, the creation of an illusory ‘other’ to substitute for the lack of any true one; one which comes into being through ‘assimilation’, as opposed to alterité. The disastrous aspect is that this similarity may not hold for long, and there may have come the day when the individual desperately realizes his ‘self,’ along with his ‘created’ others, is lost in chaos. On that day, the only thing keeping him from falling into total chaos will be the terrorizing, disastrous, and virutic ‘Other’ he can no longer adequately deal with, let alone dominate.`,
        },
        {
          sectionTitle: 'Bibliography',
          sectionText: `Alloul, Malek. The Colonial Harem. University of Minnesota Press. 2003.
          Barthes, Roland. Ian Watt. Gerçekçilik ve Romansal Biçim. Yirmidört Yayınları. 2006. translation of Barthes, Roland. L’effet de Réel.
          Baudrillard, Jean. Tam Ekran. Yapı Kredi Yayınları. 2000. translation of Ecran Total. Editions Galilée. 1997.
          Čerkez, Beatriz Tomšič. Tonka Tacol. “Interculturalism and Visual Art Education: Seeking for ‘Spaces in Between’”. 2004. available at
          <http://www.inter-disciplinary.net/ci/interculturalism/ic2/cerkeztacol%20paper.pdf>
          Derrida, Jacques. Spurs: Nietzsche’s Styles. The University of Chicago Press. 1979. French-English bilingual version of Eperons: les Styles de Nietzsche. Flammarion. 1978.
          Diener, Pablo. “The Picturesque as an Aesthetic Category in the Art of Travelers: Notes on J. M. Rugendas’s Work.” Historia (Santiago), v.40, n.2, Dec. 2007.
          Guénon, René. Niceliğin Egemenliği ve Çağın Alametleri. İz Yayıncılık. 1990. translation of Le Regne de la Quantité et les Signes des Temps. Paris. 1962.
          Hayes, Jarrod. Queer Nations: Marginal Sexualities in the Maghreb. University of Chicago Press. 2000.
          Kerbrat, C. “Le Texte Littéraire: non-référence, auto-référence, ou référence fictionnelle?” Texte, vol. 1. 1982.
          Needham, Gerald. “Orientalism in France” Art Journal, vol. 42, no. 4, The Crisis in the Discipline. Winter, 1982.`,
        },
      ],
      'https://source.unsplash.com/HaVi2eOrydo',
      [
        `In effect, no real alternative other is anymore tolerated within our understanding of reality. The synthetic subject has then created synthetic others and assimilated them.`,
        `A comparison with Manet’s revolutionary Masked Ball at the Opera (1873-4) which presents another ‘flesh market’, inconveniently at home (behind the galleries of the Opera House), with the French nouveaux riches as buyers and the female flesh realistically presented in fancy dresses rather than au naturel may tell us a lot on the process of ‘other’ization and what really is ‘other’ized.`,
      ],
      [
        {
          commentText: 'A riveting analysis of orientalism!',
          commentAuthor: this.testUser,
          commentDate: new Date('February 19, 2023 17:06:00'),
        },
      ],
      [
        'Orientalism',
        'Art',
        'Orientalist Art',
        'Colonialism',
        'Universalism',
        'Other',
        'Synthetic Subject',
        'G. W. F. Hegel',
        'Edward Said',
        'F. W. Nietzsche',
        'Jean Baudrillard',
        'Jacques Derrida',
        'René, Guénon',
      ]
    ),
    new Blog(
      this.testUser,
      'My first blog title not featured',
      'blog description 2',
      false,
      new Date('December 17, 2022 03:24:00'),
      'my-first-blog-title-not-featured',
      'Article',
      'Published',
      [
        {
          sectionTitle: 'First section title',
          sectionText: 'First section text',
        },
        {
          sectionTitle: 'Second section title',
          sectionText: 'Second section text',
        },
      ],
      'https://source.unsplash.com/HB-Kf9WLy_0/1600x900',
      ['first quote', 'second quote'],
      [
        {
          commentText: 'Great blog post!',
          commentAuthor: this.testUser,
          commentDate: new Date('January 3, 2022 09:24:00'),
        },
      ],

      ['Sprituality', 'Philosophy']
    ),
    new Blog(
      this.testUser,
      'My first blog title3',
      'blog description 3',
      false,
      new Date('December 17, 2022 03:24:00'),
      'my-first-blog-title3',
      'Article',
      'Published',
      [
        {
          sectionTitle: 'First section title',
          sectionText: 'First section text',
        },
        {
          sectionTitle: 'Second section title',
          sectionText: 'Second section text',
        },
      ],
      'https://source.unsplash.com/9jsV5uKbAEM/1600x900',
      ['first quote', 'second quote'],
      [
        {
          commentText: 'Great blog post!',
          commentAuthor: this.testUser,
          commentDate: new Date('January 3, 2022 09:24:00'),
        },
      ],

      ['Tag1', 'Tag2']
    ),
    new Blog(
      this.testUser,
      'My first blog title4',
      'blog description 4',
      false,
      new Date('December 17, 2022 03:24:00'),
      'my-first-blog-title4',
      'Article',
      'Draft',
      [
        {
          sectionTitle: 'First section title',
          sectionText: 'First section text',
        },
        {
          sectionTitle: 'Second section title',
          sectionText: 'Second section text',
        },
      ],
      'https://source.unsplash.com/pz_hAv6ER7c/1600x900',
      ['first quote', 'second quote'],
      [
        {
          commentText: 'Great blog post!',
          commentAuthor: this.testUser,
          commentDate: new Date('January 3, 2022 09:24:00'),
        },
      ],

      ['Tag1', 'Tag2']
    ),
    new Blog(
      this.testUser,
      'My first blog title featured5',
      'blog description 5',
      true,
      new Date('December 17, 2022 03:24:00'),
      'my-first-blog-title-featured5',
      'Article',
      'Published',
      [
        {
          sectionTitle: 'First section title',
          sectionText: 'First section text',
        },
        {
          sectionTitle: 'Second section title',
          sectionText: 'Second section text',
        },
      ],
      'https://source.unsplash.com/9z-veIxii6k/1600x900',
      ['first quote', 'second quote'],
      [
        {
          commentText: 'Great blog post!',
          commentAuthor: this.testUser,
          commentDate: new Date('January 3, 2022 09:24:00'),
        },
      ],

      ['Tag1', 'Tag2']
    ),
    new Blog(
      this.testUser,
      'My first blog title featured6',
      'blog description 6',
      true,
      new Date('December 17, 2022 03:24:00'),
      'my-first-blog-title-featured6',
      'Article',
      'Published',
      [
        {
          sectionTitle: 'First section title',
          sectionText: 'First section text',
        },
        {
          sectionTitle: 'Second section title',
          sectionText: 'Second section text',
        },
      ],
      'https://source.unsplash.com/TiSLq6Gbftg/1600x900',
      ['first quote', 'second quote'],
      [
        {
          commentText: 'Great blog post!',
          commentAuthor: this.testUser,
          commentDate: new Date('January 3, 2022 09:24:00'),
        },
      ],

      ['Tag1', 'Tag2']
    ),
    new Blog(
      this.testUser,
      'My first blog title featured7',
      'blog description 7',
      true,
      new Date('December 17, 2022 03:24:00'),
      'my-first-blog-title-featured7',
      'Article',
      'Published',
      [
        {
          sectionTitle: 'First section title',
          sectionText: 'First section text',
        },
        {
          sectionTitle: 'Second section title',
          sectionText: 'Second section text',
        },
      ],
      'https://source.unsplash.com/-haAxbjiHds/1600x900',
      ['first quote', 'second quote'],
      [
        {
          commentText: 'Great blog post!',
          commentAuthor: this.testUser,
          commentDate: new Date('January 3, 2022 09:24:00'),
        },
      ],

      ['Tag1', 'Tag2']
    ),
    new Blog(
      this.testUser,
      'My first blog title featured8',
      'blog description 8',
      true,
      new Date('December 17, 2022 03:24:00'),
      'my-first-blog-title-featured8',
      'Article',
      'Published',
      [
        {
          sectionTitle: 'First section title',
          sectionText: 'First section text',
        },
        {
          sectionTitle: 'Second section title',
          sectionText: 'Second section text',
        },
      ],
      'https://source.unsplash.com/K8nr6rNDtUE/1600x900',
      ['first quote', 'second quote'],
      [
        {
          commentText: 'Great blog post!',
          commentAuthor: this.testUser,
          commentDate: new Date('January 3, 2022 09:24:00'),
        },
      ],

      ['Tag1', 'Tag2']
    ),
    new Blog(
      this.testUser,
      'My first blog title featured9',
      'blog description 9',
      true,
      new Date('December 17, 2022 03:24:00'),
      'my-first-blog-title-featured9',
      'Article',
      'Published',
      [
        {
          sectionTitle: 'First section title',
          sectionText: 'First section text',
        },
        {
          sectionTitle: 'Second section title',
          sectionText: 'Second section text',
        },
      ],
      'https://source.unsplash.com/rUGiNjP4OX4/1600x900',
      ['first quote', 'second quote'],
      [
        {
          commentText: 'Great blog post!',
          commentAuthor: this.testUser,
          commentDate: new Date('January 3, 2022 09:24:00'),
        },
      ],

      ['Tag1', 'Tag2']
    ),
  ];

  constructor() {}

  getBlogs(): Blog[] {
    // only show published posts
    return this.blogs.filter((blog) => blog.status === 'Published');
  }

  getFeaturedBlogs(): Blog[] {
    return this.blogs.filter((blog) => blog.featured);
  }

  getBlog(address: string): Blog {
    return this.blogs.filter((blog) => blog.address === address)[0];
  }

  getTags(): Set<string> {
    const arrayOfTags = this.blogs.map((t) => t.blogTags);
    const combinedArray = [].concat(...arrayOfTags);
    return new Set(combinedArray);
  }

  getBlogsByTags(tags: string[]) {
    let filteredBlogs: Blog[] = [];
    this.blogs.filter((blog) => {
      for (let t of blog.blogTags) {
        if (tags.includes(t)) {
          if (filteredBlogs.includes(blog) === false) {
            filteredBlogs.push(blog);
          }
        }
      }
    });
    return filteredBlogs;
  }

  newBlog(blog: Blog) {
    //finalBlog
    this.blogs.push(blog);
    this.blogsChanged.next(this.getBlogs());
    this.tagsChanged.next(this.getTags());
    if (blog.featured) {
      this.featuredBlogsChanged.next(this.getFeaturedBlogs());
    }

  }

  updateBlog(address: string, blog: Blog) {
    const index = this.blogs.findIndex((i) => i.address === address);
    console.log(index);
    console.log(JSON.stringify(this.blogs[index]));
    this.blogs[index] = blog;
    this.blogsChanged.next(this.getBlogs());
    this.tagsChanged.next(this.getTags());
    if (blog.featured) {
      this.featuredBlogsChanged.next(this.getFeaturedBlogs());
    }
  }

  deleteBlog(address: string) {
    // let index = this.blogs
    //   .map(function (e) {
    //     return e.address;
    //   })
    //   .indexOf(address);

    // let index = myArray.findIndex( element => {
    //   if (element.name === 'Maria') {
    //     return true;
    //   }
    // });
    console.log("Parameter "+address);
    const index = this.blogs.findIndex(i => i.address === address);
    console.log(index);
    console.log(JSON.stringify(this.blogs[index]));
    const isFeatured = this.blogs[index].featured;
    this.blogs.splice(index, 1);
    this.blogsChanged.next(this.getBlogs());
    this.tagsChanged.next(this.getTags());
    if (isFeatured) {
      this.featuredBlogsChanged.next(this.getFeaturedBlogs());
    }
  }
}
