package org.example;


import java.util.Scanner;

class Book {
    int bookId;
    String bookName, authorName, availability;

    void input(Scanner sc) {
        System.out.print("Enter Book ID: ");
        bookId = sc.nextInt();
        sc.nextLine();

        System.out.print("Enter Book Name: ");
        bookName = sc.nextLine();

        System.out.print("Enter Author Name: ");
        authorName = sc.nextLine();

        System.out.print("Enter Availability: ");
        availability = sc.nextLine();
    }

    void display() {
        System.out.println("\nBook ID: " + bookId);
        System.out.println("Book Name: " + bookName);
        System.out.println("Author Name: " + authorName);
        System.out.println("Availability: " + availability);
    }
}

public class Main {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        Book b = new Book();

        b.input(sc);

        System.out.println("\n--- Book Details ---");
        b.display();

        sc.close();
    }
}

