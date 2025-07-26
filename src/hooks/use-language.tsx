
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi';

const translations = {
  en: {
    nav: {
      about: 'About',
      contact: 'Contact',
      language: 'Language',
      joinAsMentor: 'Join as a Mentor',
      signIn: 'Sign In',
      signOut: 'Sign Out',
    },
    home: {
        hero: {
            title: 'Find Your Perfect Mentor',
            subtitle: 'Use the power of AI to connect with mentors who can help you achieve your goals. Describe what you want to learn, and we\'ll find the right match for you.'
        },
        features: {
            gupshup: {
                title: 'Gupshup Gurukul',
                subtitle: 'Peer voice groups for learning and motivation',
                description: 'Connect with fellow learners in voice-based groups. Share your progress, ask questions, and stay motivated together on your journey.',
                button: 'Join a Group'
            },
            whisper: {
                title: 'WhisperAsk',
                subtitle: 'Ask questions anonymously',
                description: 'Have a question you\'re hesitant to ask? Use WhisperAsk to get answers from mentors anonymously and confidentially.',
                button: 'Ask a Question'
            },
            shruti: {
                title: 'Shruti Mode',
                subtitle: 'Works offline via downloaded audio',
                description: 'Access your learning materials anytime, anywhere, even without an internet connection. Download audio content and continue your progress offline.',
                button: 'Learn More'
            },
            gaatha: {
                title: 'Audio Badges + Gaatha',
                subtitle: 'Motivational progress stories in audio form',
                description: 'Earn badges as you learn and listen to inspiring stories from others who have achieved their goals. A unique way to track your progress and stay inspired.',
                button: 'Listen Now'
            }
        }
    },
    bolbuddy: {
      title: 'What are your goals?',
      description: 'Tell us what you want to achieve. You can type or use your voice.',
      form: {
        label: 'Your Goals',
        placeholder: 'e.g., \'I want to learn coding to get a job\' or \'I want to start my own business...\'',
        startRecording: 'Start recording',
        stopRecording: 'Stop recording',
        button: {
          default: 'Find My Mentor',
          loading: 'Matching...'
        }
      },
      loading: 'Finding the perfect mentor for you...',
      toast: {
        error: {
            title: 'Failed to find a mentor'
        }
      }
    },
    voice: {
        unsupported: {
            title: 'Unsupported Browser',
            description: 'Your browser does not support voice recording.'
        },
        error: {
            title: 'Voice Error',
            description: 'Could not recognize speech'
        }
    },
    about: {
        title: 'ABOUT US',
        imageAlt: 'About BolBuddy',
        description: 'BolBuddy is an AI-powered mentorship platform designed to bridge the gap between aspirations and achievements for students across India. We connect learners with experienced mentors, provide peer-to-peer support through \'Gupshup\' groups, and offer a safe space to ask questions anonymously with \'WhisperAsk\'. Our goal is to make quality guidance accessible to everyone, everywhere.',
        visionTitle: 'VISION',
        visionText: 'To empower every student with the guidance, skills, and confidence they need to realize their full potential and succeed in their chosen career path.',
        missionTitle: 'MISSION',
        missionText: 'To build a collaborative and inclusive learning community where students are inspired to learn, create, and solve real-world problems through AI-driven mentorship and peer support.'
    },
    contact: {
        title: 'Get In Touch',
        description: 'We\'re here to help. Contact us with any questions or feedback.',
        email: 'Email',
        'Founder & Tech Lead': 'Founder & Tech Lead',
        'Co-founder & AI Specialist': 'Co-founder & AI Specialist'
    },
    joinMentor: {
        title: 'Become a Mentor',
        description: 'Share your knowledge and guide the next generation of talent. Fill out the form below to join us.',
        form: {
            name: { label: 'Full Name' },
            email: { label: 'Email Address' },
            expertise: { label: 'Expertise / Skills', placeholder: 'e.g., Python, UI/UX Design, Public Speaking' },
            bio: { label: 'Short Bio', placeholder: 'Tell us a little about yourself and your experience.' },
            button: {
                default: 'Apply to be a Mentor',
                loading: 'Submitting Application...'
            }
        },
        submitted: {
            title: 'Thank You!',
            description: 'Your application has been received. We will review it and get in touch with you shortly.'
        },
        toast: {
            title: 'Application Submitted!',
            description: 'Thank you for your interest in becoming a mentor.'
        }
    },
    errors: {
        "Name must be at least 2 characters.": "Name must be at least 2 characters.",
        "Please enter a valid email.": "Please enter a valid email.",
        "Please list your areas of expertise (at least 10 characters).": "Please list your areas of expertise (at least 10 characters).",
        "Bio must be at least 20 characters.": "Bio must be at least 20 characters.",
        "Name is required": "Name is required",
        "Please select a date": "Please select a date",
        "Please tell us a bit more about your goals (at least 10 characters).": "Please tell us a bit more about your goals (at least 10 characters).",
    },
    mentorCard: {
        about: 'About {{name}}',
        reason: 'Why we matched you',
        listen: 'Listen to Intro',
        generating: 'Generating...',
        connect: 'Connect',
        bookCall: 'Book a Voice Call'
    },
    mentorConnect: {
        greeting: 'Shabash! Aapka mentor ab aapke sath hai.',
        tabs: {
            voiceMessage: {
                title: 'Send Voice Message',
                description: 'Record a message for your mentor. Ask a question or share an update.',
                placeholder: 'Your recorded message will appear here...',
                button: 'Send Message'
            },
            bookCall: {
                title: 'Book Weekly Call',
                description: 'Schedule a one-on-one call with {{name}}.',
                form: {
                    name: { label: 'Your Name' },
                    date: { label: 'Preferred Date' },
                    notes: { label: 'Notes (Optional)', placeholder: 'Anything specific you want to discuss?' },
                    button: 'Book Call'
                }
            },
            lessons: {
                title: 'Audio Lessons',
                description: 'Listen to lessons from {{name}}.',
                lesson1: { title: 'Lesson 1: Introduction to {{expertise}}' },
                lesson2: { title: 'Lesson 2: Core Concepts' },
                offline: {
                    title: 'Offline Access',
                    description: 'Download lessons to listen anywhere, even without an internet connection.'
                }
            }
        },
        messageSent: {
            title: 'Message Sent!',
            description: 'Your voice message has been sent to your mentor.',
            alertDescription: 'Your mentor will receive your message and respond soon.'
        },
        callBooked: {
            title: 'Call Booked!',
            description: 'Your call with {{name}} has been scheduled.',
            alertTitle: 'Call Scheduled!',
            alertDescription: 'Your weekly call has been booked. You will receive a confirmation email shortly.'
        }
    }
  },
  hi: {
    nav: {
      about: 'हमारे बारे में',
      contact: 'संपर्क',
      language: 'भाषा',
      joinAsMentor: 'मेंटर के रूप में जुड़ें',
      signIn: 'साइन इन करें',
      signOut: 'साइन आउट',
    },
    home: {
        hero: {
            title: 'अपना आदर्श मेंटर ढूंढें',
            subtitle: 'अपने लक्ष्यों को प्राप्त करने में मदद करने वाले मेंटर्स से जुड़ने के लिए AI की शक्ति का उपयोग करें। बताएं कि आप क्या सीखना चाहते हैं, और हम आपके लिए सही मैच ढूंढेंगे।'
        },
        features: {
            gupshup: {
                title: 'गपशप गुरुकुल',
                subtitle: 'सीखने और प्रेरणा के लिए पीयर वॉयस ग्रुप',
                description: 'वॉयस-आधारित समूहों में साथी शिक्षार्थियों से जुड़ें। अपनी प्रगति साझा करें, प्रश्न पूछें, और अपनी यात्रा पर एक साथ प्रेरित रहें।',
                button: 'एक समूह में शामिल हों'
            },
            whisper: {
                title: 'व्हिस्परआस्क',
                subtitle: 'गुमनाम रूप से प्रश्न पूछें',
                description: 'कोई ऐसा प्रश्न है जिसे पूछने में आप झिझक रहे हैं? गुमनाम और गोपनीय रूप से मेंटर्स से उत्तर पाने के लिए व्हिस्परआस्क का उपयोग करें।',
                button: 'एक प्रश्न पूछें'
            },
            shruti: {
                title: 'श्रुति मोड',
                subtitle: 'डाउनलोड किए गए ऑडियो के माध्यम से ऑफ़लाइन काम करता है',
                description: 'बिना इंटरनेट कनेक्शन के भी, कहीं भी, कभी भी अपनी सीखने की सामग्री तक पहुँचें। ऑडियो सामग्री डाउनलोड करें और अपनी प्रगति ऑफ़लाइन जारी रखें।',
                button: ' और जानें'
            },
            gaatha: {
                title: 'ऑडियो बैज + गाथा',
                subtitle: 'ऑडियो रूप में प्रेरक प्रगति की कहानियाँ',
                description: 'जैसे-जैसे आप सीखते हैं, बैज अर्जित करें और अपने लक्ष्यों को प्राप्त करने वाले दूसरों की प्रेरक कहानियों को सुनें। अपनी प्रगति को ट्रैक करने और प्रेरित रहने का एक अनूठा तरीका।',
                button: 'अभी सुनें'
            }
        }
    },
    bolbuddy: {
      title: 'आपके लक्ष्य क्या हैं?',
      description: 'हमें बताएं कि आप क्या हासिल करना चाहते हैं। आप टाइप कर सकते हैं या अपनी आवाज का उपयोग कर सकते हैं।',
      form: {
        label: 'आपके लक्ष्य',
        placeholder: 'जैसे, \'मैं नौकरी पाने के लिए कोडिंग सीखना चाहता हूं\' या \'मैं अपना खुद का व्यवसाय शुरू करना चाहता हूं...\'',
        startRecording: 'रिकॉर्डिंग शुरू करें',
        stopRecording: 'रिकॉर्डिंग बंद करें',
        button: {
          default: 'मेरा मेंटर ढूंढें',
          loading: 'मैचिंग...'
        }
      },
      loading: 'आपके लिए सही मेंटर ढूंढ रहा है...',
       toast: {
        error: {
            title: 'मेंटर खोजने में विफल'
        }
      }
    },
    voice: {
        unsupported: {
            title: 'असमर्थित ब्राउज़र',
            description: 'आपका ब्राउज़र वॉयस रिकॉर्डिंग का समर्थन नहीं करता है।'
        },
        error: {
            title: 'आवाज त्रुटि',
            description: 'भाषण को पहचाना नहीं जा सका'
        }
    },
     about: {
        title: 'हमारे बारे में',
        imageAlt: 'बोलबडी के बारे में',
        description: 'बोलबडी एक AI-संचालित मेंटरशिप प्लेटफ़ॉर्म है जिसे पूरे भारत में छात्रों के लिए आकांक्षाओं और उपलब्धियों के बीच की खाई को पाटने के लिए डिज़ाइन किया गया है। हम शिक्षार्थियों को अनुभवी मेंटर्स से जोड़ते हैं, \'गपशप\' समूहों के माध्यम से पीयर-टू-पीयर सहायता प्रदान करते हैं, और \'व्हिस्परआस्क\' के साथ गुमनाम रूप से प्रश्न पूछने के लिए एक सुरक्षित स्थान प्रदान करते हैं। हमारा लक्ष्य गुणवत्तापूर्ण मार्गदर्शन को हर किसी के लिए, हर जगह सुलभ बनाना है।',
        visionTitle: 'दृष्टिकोण',
        visionText: 'प्रत्येक छात्र को मार्गदर्शन, कौशल और आत्मविश्वास के साथ सशक्त बनाना ताकि वे अपनी पूरी क्षमता का एहसास कर सकें और अपने चुने हुए करियर पथ में सफल हो सकें।',
        missionTitle: 'मिशन',
        missionText: 'एक सहयोगी और समावेशी शिक्षण समुदाय का निर्माण करना जहाँ छात्रों को AI-संचालित मेंटरशिप और पीयर सपोर्ट के माध्यम से वास्तविक दुनिया की समस्याओं को सीखने, बनाने और हल करने के लिए प्रेरित किया जाता है।'
    },
    contact: {
        title: 'संपर्क करें',
        description: 'हम सहायता के लिए यहां हैं। किसी भी प्रश्न या प्रतिक्रिया के लिए हमसे संपर्क करें।',
        email: 'ईमेल',
        'Founder & Tech Lead': 'संस्थापक और तकनीकी प्रमुख',
        'Co-founder & AI Specialist': 'सह-संस्थापक और AI विशेषज्ञ'
    },
    joinMentor: {
        title: 'एक मेंटर बनें',
        description: 'अपने ज्ञान को साझा करें और अगली पीढ़ी की प्रतिभा का मार्गदर्शन करें। हमसे जुड़ने के लिए नीचे दिया गया फॉर्म भरें।',
        form: {
            name: { label: 'पूरा नाम' },
            email: { label: 'ईमेल पता' },
            expertise: { label: 'विशेषज्ञता / कौशल', placeholder: 'जैसे, पायथन, यूआई/यूएक्स डिजाइन, सार्वजनिक भाषण' },
            bio: { label: 'संक्षिप्त बायो', placeholder: 'हमें अपने और अपने अनुभव के बारे में थोड़ा बताएं।' },
            button: {
                default: 'मेंटर बनने के लिए आवेदन करें',
                loading: 'आवेदन जमा हो रहा है...'
            }
        },
        submitted: {
            title: 'धन्यवाद!',
            description: 'आपका आवेदन प्राप्त हो गया है। हम इसकी समीक्षा करेंगे और जल्द ही आपसे संपर्क करेंगे।'
        },
        toast: {
            title: 'आवेदन जमा किया गया!',
            description: 'एक मेंटर बनने में आपकी रुचि के लिए धन्यवाद।'
        }
    },
    errors: {
        "Name must be at least 2 characters.": "नाम कम से कम 2 अक्षरों का होना चाहिए।",
        "Please enter a valid email.": "कृपया एक वैध ईमेल दर्ज करें।",
        "Please list your areas of expertise (at least 10 characters).": "कृपया अपनी विशेषज्ञता के क्षेत्रों (कम से कम 10 अक्षर) को सूचीबद्ध करें।",
        "Bio must be at least 20 characters.": "बायो कम से कम 20 अक्षरों का होना चाहिए।",
        "Name is required": "नाम आवश्यक है",
        "Please select a date": "कृपया एक तारीख चुनें",
        "Please tell us a bit more about your goals (at least 10 characters).": "कृपया हमें अपने लक्ष्यों के बारे में थोड़ा और बताएं (कम से कम 10 अक्षर)।",
    },
    mentorCard: {
        about: '{{name}} के बारे में',
        reason: 'हमने आपको क्यों मैच किया',
        listen: 'परिचय सुनें',
        generating: 'उत्पन्न हो रहा है...',
        connect: 'जुड़ें',
        bookCall: 'वॉयस कॉल बुक करें'
    },
    mentorConnect: {
        greeting: 'शाबाश! आपका मेंटर अब आपके साथ है।',
        tabs: {
            voiceMessage: {
                title: 'वॉयस संदेश भेजें',
                description: 'अपने मेंटर के लिए एक संदेश रिकॉर्ड करें। एक प्रश्न पूछें या एक अपडेट साझा करें।',
                placeholder: 'आपका रिकॉर्ड किया गया संदेश यहां दिखाई देगा...',
                button: 'संदेश भेजें'
            },
            bookCall: {
                title: 'साप्ताहिक कॉल बुक करें',
                description: '{{name}} के साथ एक-एक कॉल शेड्यूल करें।',
                form: {
                    name: { label: 'आपका नाम' },
                    date: { label: 'पसंदीदा तारीख' },
                    notes: { label: 'नोट्स (वैकल्पिक)', placeholder: 'क्या आप कुछ विशेष चर्चा करना चाहते हैं?' },
                    button: 'कॉल बुक करें'
                }
            },
            lessons: {
                title: 'ऑडियो पाठ',
                description: '{{name}} से पाठ सुनें।',
                lesson1: { title: 'पाठ 1: {{expertise}} का परिचय' },
                lesson2: { title: 'पाठ 2: मुख्य अवधारणाएँ' },
                offline: {
                    title: 'ऑफ़लाइन पहुँच',
                    description: 'कहीं भी सुनने के लिए पाठ डाउनलोड करें, बिना इंटरनेट कनेक्शन के भी।'
                }
            }
        },
        messageSent: {
            title: 'संदेश भेजा गया!',
            description: 'आपका वॉयस संदेश आपके मेंटर को भेज दिया गया है।',
            alertDescription: 'आपका मेंटर आपका संदेश प्राप्त करेगा और जल्द ही जवाब देगा।'
        },
        callBooked: {
            title: 'कॉल बुक हो गई!',
            description: '{{name}} के साथ आपकी कॉल निर्धारित हो गई है।',
            alertTitle: 'कॉल निर्धारित!',
            alertDescription: 'आपकी साप्ताहिक कॉल बुक हो गई है। आपको शीघ्र ही एक पुष्टिकरण ईमेल प्राप्त होगा।'
        }
    }
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, options?: { [key: string]: string | number }) => string;
  tError: (key: string | undefined) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: () => '',
  tError: () => '',
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string, options?: { [key: string]: string | number }) => {
    const keys = key.split('.');
    let result = translations[language] as any;
    for (const k of keys) {
      result = result?.[k];
    }

    if (typeof result === 'string' && options) {
        Object.keys(options).forEach(optKey => {
            result = result.replace(`{{${optKey}}}`, String(options[optKey]));
        });
    }

    return result || key;
  };
  
  const tError = (key: string | undefined) => {
    if (!key) return '';
    const errorTranslations = translations[language].errors as {[key: string]: string};
    return errorTranslations[key] || key;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, tError }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
