export const PRESET_COLORS = [
  { id: "red", label: "Qırmızı", color: "#EF4444" },
  { id: "yellow", label: "Sarı", color: "#F59E0B", badge: "27%" },
  { id: "green", label: "Yaşıl", color: "#10B981" },
  { id: "blue", label: "Mavi", color: "#3B82F6" },
  { id: "purple", label: "Bənövşəyi", color: "#8B5CF6" },
  { id: "pink", label: "Çəhrayı", color: "#EC4899" },
];


// Local preview content used by the existing reader screens.
export const BOOK_PREVIEW = { initialPage: 257, totalPages: 1200, thumbnails: [256, 257, 258, 259] };
export const SLIDE_PREVIEW = { initialPage: 4, totalPages: 15 };

export const BOOK_PAGES = [
  {
    "number": 256,
    "paragraphs": [
      "Chapter 3: Algorithms and Computational Complexity. An algorithm is a finite sequence of precise instructions for solving a problem or performing a computation. The study of algorithms is at the very core of computer science, providing the theoretical and practical foundation for writing efficient computer programs.",
      "When an algorithm is executed on a computer, it consumes computational resources such as processor time and memory. The efficiency of an algorithm is analyzed using Big-O notation, which measures the rate at which its running time grows as the input size increases. This analytical approach enables software engineers to evaluate different algorithms and choose the most suitable one for large-scale applications."
    ]
  },
  {
    "number": 257,
    "paragraphs": [
      "“Discrete Mathematics and Its Applications” by Kenneth H. Rosen is one of the most widely recognized and extensively used textbooks in the fields of computer science, mathematics, and engineering. The seventh edition of this book continues to uphold its reputation by offering a clear, thorough, and well-organized introduction to the essential ideas and principles that form the foundation of discrete mathematics. It is designed not only for students majoring in computer science and engineering but also for anyone who seeks a solid mathematical background to understand computational thinking and modern problem-solving techniques.",
      "The book carefully balances theoretical foundations with practical applications, helping readers see how abstract mathematical structures are directly relevant to computer algorithms, programming, and real-world systems. Core topics covered include logic, set theory, functions, algorithms, number theory, combinatorics, and graph theory. In addition, the text explores probability, relations, Boolean algebra, and recurrence relations, providing students with the tools they need to model and analyze complex computational problems.",
      "Each chapter is logically structured and pedagogically sound, beginning with fundamental definitions and gradually progressing toward more advanced topics. Rosen ensures that readers are never overwhelmed by complexity by providing numerous illustrative examples, diagrams, and detailed explanations. These examples bridge the gap between theory and practice, demonstrating how discrete mathematical principles are used in data structures, algorithm design, and computer systems.",
      "One of the key strengths of Rosen's work is its balance between mathematical rigor and accessibility. The author avoids unnecessary formalism but never sacrifices precision, making the material approachable for beginners while still challenging for advanced learners. The book includes a diverse range of exercises at the end of each section — from straightforward computations to complex proofs and real-world applications — allowing students to test their understanding and develop deeper analytical skills.",
      "Furthermore, the seventh edition updates its examples and problem sets to reflect modern computational practices and technologies, showing how discrete mathematics underpins areas such as cryptography, network theory, and computer security. Throughout the text, real-world case studies and algorithmic illustrations are incorporated to highlight practical applications in contemporary computer science."
    ]
  },
  {
    "number": 258,
    "paragraphs": [
      "Chapter 4: Number Theory and Cryptography. Number theory is the branch of mathematics that explores the properties of integers. While it was once considered one of the purest and most theoretical fields of mathematics with little practical application, today it plays an indispensable role in modern computer algorithms and network security.",
      "Every secure transaction performed over the Internet relies heavily on concepts from elementary number theory, including prime factorization, modular arithmetic, and the Euclidean algorithm for computing greatest common divisors."
    ]
  }
];
