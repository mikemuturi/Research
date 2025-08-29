import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

// FAQ item component
const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors duration-200"
      >
        <h3 className="text-lg font-semibold text-gray-900 pr-4">
          {question}
        </h3>
        <div className="flex-shrink-0">
          {isOpen ? (
            <Minus className="h-5 w-5 text-blue-600" />
          ) : (
            <Plus className="h-5 w-5 text-blue-600" />
          )}
        </div>
      </button>
      {isOpen && (
        <div className="px-6 pb-6">
          <div className="border-t border-gray-100 pt-4">
            <p className="text-gray-600 leading-relaxed">{answer}</p>
          </div>
        </div>
      )}
    </div>
  );
};

// FAQ list component
const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "How long does the assessment take?",
      answer:
        "The RAFSIA assessment typically takes 10–15 minutes to complete depending on your role and responses."
    },
    {
      question: "Is my data secure and private?",
      answer:
        "Yes, all responses are encrypted and stored securely. You can also submit anonymously."
    },
    {
      question: "Can I retake the assessment?",
      answer:
        "Yes, you may retake it anytime to track improvements in your readiness scores."
    },
    {
      question: "How are the results calculated?",
      answer:
        "Results are based on responses across five dimensions using a validated scoring methodology."
    },
    {
      question: "Who can use this assessment?",
      answer:
        "Institutions of higher learning and internet service providers evaluating readiness for satellite internet adoption."
    },
    {
      question: "What happens after I complete the assessment?",
      answer:
        "You’ll receive instant results with detailed scores, visualizations, and personalized recommendations."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Common questions about the RAFSIA assessment tool and satellite internet readiness
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <FAQItem key={idx} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
