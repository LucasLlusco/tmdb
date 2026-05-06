"use client"
import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { ArrowUp } from 'lucide-react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-5 right-5">
      {isVisible && (
        <Button onClick={scrollToTop}>
          <ArrowUp /> Back to top
        </Button>
      )}
    </div>
  );
};

export default ScrollToTop;