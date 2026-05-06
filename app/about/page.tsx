'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, AnimatePresence } from 'framer-motion';
import { ArrowRight, Instagram, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';

import Footer from '@/components/Footer';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

const variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const charVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const MagneticButton = ({ children, href }: { children: React.ReactNode; href?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  };

  return (
    <motion.button
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-[#FF3366] text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm"
    >
      {href ? <a href={href}>{children}</a> : children}
    </motion.button>
  );
};

const teamMembers = [
  {
    name: "Saara Vuorela",
    role: "Founder",
    image: "https://images.ctfassets.net/qoh8xm2ubioc/4eBrTd13vozqcxfvxF7hzl/2e012ad6e85e76f67cf285111c73d41c/Saara_16022.jpg?w=924&h=1294&q=50&fm=webp",
    bio: "In the early stages of her career she studied at the Vidal Sassoon Academy in London. The experience shaped her in countless ways, ensuring that her love of style was forever ingrained in integrity and expertise. “I found my calling!” she exclaimed. To say that she is determined is an understatement. She draws on her precise nature and unique skill set to create hair that naturally suits the client. “There is a moment when the hair style becomes a part of you, effortlessly customised to fit the clients persona, organically unfolding to suit the overall style and all without hesitation. My eyes rest when I see skilfully cut and coloured hair. There is a joy in creating an overall experience for the client, in a wonderful environment with attention to detail and engaging conversation. When the client leaves my chair with a beautiful smile on their face, I feel inspired. “\n\nShe considers her job as a way of life. When she is not working on a client, she works as an educator and mentor to others. “There is always room for improvement and sharing cutting edge techniques.”",
    inspiration: "“Aesthetics and meeting new people! I think of the client as a whole - what kind of hair suits the client's face, personality, style and lifestyle. The hair crowns the whole. In addition to client work, I am interested in the commercial side of business. I am happy that I can now combine my creative side with my love for business and concept. The bob haircut is my eternal beacon! A bob is a haircut that suits the client´s features and personality, and creating it requires creativity, understanding and strong technical skills.",
    currentInspiration: "I am also really inspired by our amazing team! It's rewarding and refreshing to see different perspectives and approaches to the craft! Each of us have a unique and diverse technical sense of style. I am surrounded by inspiration!”"
  },
  {
    name: "Kristel Tamm",
    role: "Founder",
    image: "https://images.ctfassets.net/qoh8xm2ubioc/5BJGU7xVt4rJWUYgozl6of/f5f431faeab4da2a1caef6b152127b26/Kristel_16049.jpg?w=924&h=1294&q=50&fm=webp",
    bio: "Kristel has worked in some of the most prominent hair salons in Helsinki. She took the fashion world by storm with her diverse experience on the set of television shows, commercials and in magazine photo shoots. She enjoys providing training for both hair professionals and private customers. If you happen to come by BOB, you will most likely see her. With a long list of loyal customers. She is a permanent fixture at the salon who better than the founder to greet you at the door when you come by for coffee and hair appointments.\n\n“Hair is more than just work - its a way of life! When I'm working on someone's hair, the rest of the world disappears. The hair industry is full of whimsy and vivaciousness, it inspires creativity and encapsulates me”, she says.\n\nHer strengths include the intuitive ability to recognise and foresee shifts and currents. She is constantly devoted to maintaining professional development, nurturing inspiration and curiosity.\n\n“BOB was also born out of intuition; a compelling feeling”, she recalls.\n\n“Hair can reflect changes in the times and the life of the person wearing it”, she says. Coco Chanel knew that a woman who radically changes her hairstyle is also about to change her life.",
    inspiration: "“People who live boldly and creatively. I'm also inspired by literature, art, film and music. I'm interested in street fashion and captivated by the times we live in.“",
    currentInspiration: "“BOB Hair Helsinki, the BOB team and our customers. It's inspiring to see how even a small change in hair or hairstyle can make a person glow with happiness.”"
  },
  {
    name: "Vappu Varjoranta",
    role: "Stylist",
    image: "https://images.ctfassets.net/qoh8xm2ubioc/28oSRpZGOUohwMaoyrPi4d/893735f7ff1b71c471fb349d40eed2fd/Vappu_16035.jpg?w=924&h=1294&q=50&fm=webp",
    bio: "This is what a decade of experience in the industry, working in fashion and hair can do to a stylist! She has an incredible ability to make the hair flow effortlessly with her skilled balayage techniques. Her desire to constantly develop reveals itself in her knack for creating natural looking blonds and the skill of letting a transformation seem innate and fitting without the shock of change.\n\nWith the combination of professional ability and intuition, she is easily encapsulated by her work. “I am an eternal perfectionist whose strengths are technicality and creativity. My inspiration always starts with the clients´ own style and the way they carry themselves! I want the end result to be built to fit naturally with the client's need and style. The perks of my work are in the constant development and training which help me stay in stride and inspired.”",
    inspiration: "“Blonde hair will never stop inspiring me! Fashion, hair gurus and social media, through which I enjoy following the industrial trends and shifts are my source of ingenuity. My enduring favourite hairstyle is a BOB in all lengths, as it is beautifully suited for all ages.”",
    currentInspiration: "“I am most amazed by the incredible talented team at BOB, as well as the insanely beautiful, calm and peaceful work environment that immediately felt like home!”"
  },
  {
    name: "Miika Kemppainen",
    role: "Stylist",
    image: "https://images.ctfassets.net/qoh8xm2ubioc/1FIWGuHvUrKPboyShF7NI1/28ebc91bff6d5a245689d664862ca2b0/Miika_16021.jpg?w=924&h=1294&q=50&fm=webp",
    bio: "His experience working abroad has shaped his sense of style and broadened his ability to recognise innovation and beauty! He styles hair for magazine shoots, fashion shows and works with A-line artists and top of the line fashion brands. He has established a long career backstage during International Fashion Week and is no stranger to the beautiful!\n\nWhen it comes to customer work, his strengths include his dazzling personality, creativity and strong professional competence.",
    inspiration: "“While working in fashion, I have learnt to create strong styles that suit the customer. I am my best when dealing with various hair types and textures. I draw inspiration from fashion, friendship and art! My strong suit is the creation of an overall style - I do not only cut hair, but I also give the customer their new thing.”",
    currentInspiration: "“Despite my long career, I believe in continuous development both technically and stylistically. The new work team at BOB and our amazing postmodern hair salon are a huge source of inspiration for me right now.”"
  },
  {
    name: "Mikko Vainio",
    role: "Stylist",
    image: "https://images.ctfassets.net/qoh8xm2ubioc/4fxHnGRHrFfiCb282ALoil/48b742e2bafe5887a9ca0b0f01e09dd7/Mikko_16029.jpg?w=924&h=1294&q=50&fm=webp",
    bio: "Mikko has had a long and diverse career both in beauty and fashion. In 2014, Elle Finland chose him as hair stylist of the year. His style and craftsmanship remain timeless. He is no stranger to international fashion weeks, countless editorials and a long list of reputable shows. His love for the work balances both his strengths and his interests. In the chair and in conversation there is a creativity matched with precision and curiosity towards life, people and phenomenons. His style tends toward more classic than over the top. He is a craftsman before an artist.\n\nHis innate and intuitive skill for sensing his clients’ wishes and ideas makes him a linchpin in the industry. “It is crucial to understand your client totally to be able to fulfil their demands and come up with solutions that serve them best. I want to find everybody a style that brings out their personality and character. He also adds, I love to discuss and chit chat!”",
    inspiration: "“Meeting people and the fact that every day is different. I have always been a strong aesthete and I feel that especially in my colour work I can bring out this side of myself.”",
    currentInspiration: "“Lately I have found a lot of inspiration from my own archives. It’s exciting to follow how trends come and go and then come back again. When I was starting my career twenty years ago there were so many creative cuts – those start to feel current again.”"
  },
  {
    name: "Laura Pimiä",
    role: "Stylist",
    image: "https://images.ctfassets.net/qoh8xm2ubioc/30ScRLjLOlngc40UFen9Xo/7a638e48ea6bc0dbb09decc16dec8843/BOB_Hair_Laura_1280_LOW.jpg?w=1571&h=2244&q=50&fm=webp",
    bio: "With over 20 years of experience in the hair and beauty industry, Laura brings a wealth of knowledge and creativity to the BOB team. Her extensive background spans various fields, from fashion and editorial work for Finland’s leading magazines and fashion brands to advertising campaigns for major companies. Her versatile experience also includes film and TV productions, where she has collaborated with renowned photographers and stylists both domestically and internationally. Spending time working in Australia and continuously educating herself in London have broadened her style and perspective.\n\nFor Laura, hairdressing is more than just a profession – it’s a form of craftsmanship. “I see myself as a craftsperson, combining technical precision with creativity. I love creating natural, effortlessly beautiful hair that complements the client’s personality and lifestyle,” she says. Her ability to deliver styles that feel organic and easy to maintain is at the heart of her approach. “The best part of this job is seeing a client’s happiness when their hair feels just right and reflects who they are.”",
    inspiration: "“My clients and their stories are an endless source of inspiration for me. I love meeting new people and helping them find their style. I also draw inspiration from nature, fashion, and the incredible team here at BOB. The salon itself, with its beautiful space and creative energy, feels like the perfect environment for inspiration.”",
    currentInspiration: "“My inspiration comes from nature and my curiosity to learn new things. I love the opportunity to grow and continue my education abroad. Recently, I’ve been most inspired by new environments and meeting people – and, of course, my adorable dachshunds, Börje and Uffe, who I love taking on walks through the forests of Espoo.”"
  },
  {
    name: "Kay Borgström",
    role: "Makeup Artist",
    image: "https://images.ctfassets.net/qoh8xm2ubioc/6Jm5SUIkSDLiAkfnqBed7y/f9b610577201f20cbdeb581ef619d73e/Keiku_16036.jpg?w=924&h=1294&q=50&fm=webp",
    bio: "The rumour around town is that she is the top of the line! She does makeup for private individuals, magazine, fashion and advertisment shoots, as well as for TV and film productions. Her way of working is strongly rooted in the customer experience.\n\n“I enjoy working with the clients expectations and seeing their wishes be exceeded. I recognise the clients style and fill in the pieces toward what they are aiming at. I use my expertise to ensure that the customer shines, to make them radiate in a way that suits their personality. I also provide energy-balancing treatment if the customer wishes.“\n\nAn experienced makeup artist, she is trained in cosmetology and theatrical makeup. Her interest in the beauty industry stemmed from the experiences gained in the dance and show business world of her youth.\n\nHer source of inspiration include performing artists of all kinds! She is effortlessly pursuing her diploma in hairdressing/barbering, which will make her one of the most well rounded professionals in the beauty industry!",
    inspiration: "“The people I meet, their stories and interaction. As a makeup artist, I want to emphasize the client's individual strengths and persona, not to cover anything. I'm inspired by courage and personality. I appreciate the tailored styles of people from all walks of life. It is a thing of beauty when someone carries their personal style proudly.”",
    currentInspiration: "“In beauty, I'm constantly inspired by those who have the basics covered. When a person is feeling well, they also look well regardless of whether they are wearing makeup or not. It's also inspiring to always have the opportunity to just wipe off and start applying the makeup again, so liberating.”"
  }
];

export default function AboutPage() {
  const [selectedMember, setSelectedMember] = React.useState<typeof teamMembers[0] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <main className="bg-[#F4F4F4] min-h-screen text-[#1A1A1A]">
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto overflow-hidden">
        <motion.div variants={container} initial="hidden" animate="visible">
          <motion.h1 className="text-[clamp(2.5rem,8vw,7rem)] leading-[1.1] font-bold mb-12 flex flex-wrap gap-x-[0.3em]">
            {"REVOLUTIONARY HELSINKI HAIR SALON".split(" ").map((word, wordIdx) => (
              <span key={wordIdx} className="whitespace-nowrap inline-block">
                {word.split("").map((char, charIdx) => (
                  <motion.span 
                    key={charIdx} 
                    variants={charVariants} 
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div variants={variants}>
              <Image 
                src="/images/about.png" 
                alt="BOB Hair Helsinki Interior" 
                width={1200} 
                height={800} 
                className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"
              />
            </motion.div>
            <motion.div variants={variants} className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl font-light tracking-tighter italic">The Visionaries</h2>
                <p className="text-xl font-bold uppercase tracking-widest text-[#FF3366]">Kristel Tamm & Saara Vuorela</p>
              </div>
              <div className="space-y-6 text-lg leading-relaxed opacity-80">
                <p>BOB Hair Helsinki is more than a salon; it is a cultural destination in Kamppi, Helsinki, where the worlds of art, design, and high fashion converge. Founded on the principle of 'hair as architecture', we treat every silhouette as a piece of curated design.</p>
                <p>Our status as a Vidal Sassoon partner salon is a testament to our commitment to precision. We don't just cut hair; we engineer geometry that complements the individual's bone structure and personal aesthetic.</p>
                <p>At BOB, the environment is as carefully considered as the craft. Our space serves as a rotating gallery for local artists, fostering a creative ecosystem that inspires both our stylists and our clientele.</p>
              </div>
              <MagneticButton href="https://varaa.timma.fi/bobhairhelsinki">Secure Your Consultation</MagneticButton>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Team Section */}
      <section className="py-32 px-6 max-w-7xl mx-auto border-t border-black/5">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <h3 className="text-sm uppercase tracking-[0.3em] text-[#FF3366] mb-6">Our Team</h3>
            <h4 className="text-6xl font-bold uppercase tracking-tighter leading-none">The <br/>Artists</h4>
          </div>
          <p className="max-w-md text-lg opacity-60 italic">Diverse technical sense of style, united by precision and a shared creative vision.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {teamMembers.map((member, i) => (
            <motion.div 
              key={member.name}
              variants={variants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              onClick={() => setSelectedMember(member)}
              className="group cursor-pointer"
            >
              <div className="relative h-[500px] overflow-hidden rounded-2xl mb-6">
                <Image 
                  src={member.image} 
                  alt={member.name} 
                  fill 
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  unoptimized
                />
              </div>
              <h5 className="text-2xl font-bold uppercase tracking-tight">{member.name}</h5>
              <p className="text-[#FF3366] uppercase text-xs tracking-widest font-bold mt-2">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-2xl"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="bg-white text-[#1A1A1A] w-full max-w-7xl h-full max-h-[90vh] rounded-[2rem] overflow-hidden relative shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-black/5"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedMember(null)}
                className="absolute top-8 right-8 z-20 w-14 h-14 flex items-center justify-center bg-white border border-black/10 text-black rounded-full font-bold hover:bg-[#FF3366] hover:text-white hover:border-[#FF3366] transition-all duration-300 shadow-xl"
              >
                ✕
              </button>
              
              <div className="flex flex-col md:flex-row h-full">
                {/* Image Section - Framed like a portrait */}
                <div className="relative w-full md:w-[45%] h-[400px] md:h-full bg-[#EAEAEA] border-r border-black/5">
                  <Image 
                    src={selectedMember.image} 
                    alt={selectedMember.name} 
                    fill 
                    className="object-cover object-top"
                    unoptimized
                  />
                  <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.1)] pointer-events-none" />
                </div>
                
                {/* Content Section - Editorial Layout */}
                <div className="flex-1 p-8 md:p-20 overflow-y-auto custom-scrollbar" data-lenis-prevent>
                  <div className="max-w-2xl mx-auto md:mx-0">
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-12"
                    >
                      <div>
                        <h3 className="text-sm uppercase tracking-[0.4em] text-[#FF3366] font-bold mb-4">{selectedMember.role}</h3>
                        <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-8">{selectedMember.name}</h2>
                        <div className="h-1 w-20 bg-[#FF3366]" />
                      </div>
                      
                      <div className="space-y-16">
                        <section>
                          <h4 className="text-[10px] uppercase tracking-[0.5em] font-black opacity-30 mb-6">The Narrative</h4>
                          <p className="text-xl leading-relaxed font-light whitespace-pre-wrap">{selectedMember.bio}</p>
                        </section>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-black/5">
                          <section>
                            <h4 className="text-[10px] uppercase tracking-[0.5em] font-black opacity-30 mb-6">Philosophy</h4>
                            <p className="text-lg italic leading-relaxed opacity-80">"{selectedMember.inspiration}"</p>
                          </section>
                          
                          <section>
                            <h4 className="text-[10px] uppercase tracking-[0.5em] font-black opacity-30 mb-6">Presence</h4>
                            <p className="text-lg italic leading-relaxed opacity-80">"{selectedMember.currentInspiration}"</p>
                          </section>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="py-24 bg-[#1A1A1A] text-[#F4F4F4] overflow-hidden" ref={containerRef}>
        <motion.div style={{ y }} className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-16">
            <motion.div variants={variants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h3 className="text-[#FF3366] mb-4">PHILOSOPHY</h3>
              <p className="text-2xl font-light">Precision, technical excellence, and a fashion-forward approach define our cultural footprint.</p>
            </motion.div>
            <motion.div variants={variants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h3 className="text-[#FF3366] mb-4">SERVICES</h3>
              <ul className="space-y-2 text-xl font-light">
                {['signature bob cuts', 'modern haircuts', 'makeup', 'balayage', 'keratin', 'bridal styling'].map(s => <li key={s} className="uppercase tracking-widest border-b border-white/10 pb-2">{s}</li>)}
              </ul>
            </motion.div>
            <motion.div variants={variants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h3 className="text-[#FF3366] mb-4">LOCATION</h3>
              <p className="text-2xl font-light">Kamppi, Helsinki, Finland</p>
              <div className="mt-8 flex gap-4">
                <Instagram className="w-8 h-8" />
                <Mail className="w-8 h-8" />
                <MapPin className="w-8 h-8" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-24 items-start">
          <motion.div variants={variants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h3 className="text-sm uppercase tracking-[0.3em] text-[#FF3366] mb-8">Our Heritage</h3>
            <h4 className="text-5xl font-bold uppercase tracking-tighter mb-8 leading-none">The Sassoon <br/>Connection</h4>
            <div className="space-y-6 text-lg opacity-70 leading-relaxed">
              <p>As a Vidal Sassoon partner salon, BOB Hair Helsinki carries forward a legacy of revolutionary hairdressing. Sassoon changed the world by treating hair as a geometric form, moving away from stiff, artificial styles towards natural, manageable beauty.</p>
              <p>We honor this heritage through our rigorous training and dedication to the "wash-and-wear" philosophy—creating cuts that look perfect not just when you leave the salon, but every day after.</p>
            </div>
          </motion.div>
          <motion.div variants={variants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
            <Image src="/images/services.png" alt="Sassoon Heritage" fill className="object-cover" />
          </motion.div>
        </div>
      </section>

      <section className="py-32 px-6 bg-white border-y border-black/5">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h3 variants={variants} initial="hidden" whileInView="visible" className="text-[clamp(2rem,6vw,4rem)] font-black uppercase mb-16 tracking-tighter">Studio Culture</motion.h3>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { label: "Precision", val: "100%" },
              { label: "Artistry", val: "High" },
              { label: "Innovation", val: "Constant" },
              { label: "Client Focus", val: "Personal" }
            ].map((stat, i) => (
              <motion.div key={i} variants={variants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="p-8 border border-black/5 rounded-2xl">
                <div className="text-4xl font-bold text-[#FF3366] mb-2">{stat.val}</div>
                <div className="text-sm uppercase tracking-widest opacity-50">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 overflow-hidden whitespace-nowrap bg-[#FF3366] text-white">
        <motion.div 
          animate={{ x: ['0%', '-50%'] }} 
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="flex gap-8 text-8xl font-black uppercase"
        >
          {Array(4).fill("Vidal Sassoon Partner Salon • ").map((text, i) => <span key={i}>{text}</span>)}
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}