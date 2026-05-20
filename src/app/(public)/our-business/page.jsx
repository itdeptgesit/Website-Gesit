import { redirect } from 'next/navigation';

export const metadata = {
    title: 'Our Business | The Gesit Companies',
};

export default function OurBusinessPage() {
    // Redirect the parent route to the first available sub-business
    redirect('/our-business/property');
}
