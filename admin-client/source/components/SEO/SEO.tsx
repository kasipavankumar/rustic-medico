import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

interface ISEOProps {
    title: string;
    description?: string;
    image?: string;
    faviconEmoji?: string;
}

type LinkProps = JSX.IntrinsicElements['link'];

const SEO: React.FC<ISEOProps> = (props) => {
    const [currentLocation, setCurrentLocation] = useState<string>('');
    const { title, description, image, faviconEmoji } = props;
    const seo = {
        title: title.toLowerCase() === `home` ? `Rustic Medico` : `${title} · Rustic Medico`,
        image: !image ? `https://og-image.now.sh/${encodeURI(`Rustic Medico`)}.png` : image,
        description: !description ? 'Rustic Medico - a project demonstrating DBMS operations.' : description,
        faviconEmoji: !faviconEmoji ? '🧪' : faviconEmoji,
    };
    const links: LinkProps[] = [
        { rel: `icon`, href: `/favicon.ico` },
        {
            rel: `stylesheet`,
            href: `https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap`,
        },
    ];

    useEffect(() => {
        setCurrentLocation(window.location.href);
    }, []);

    return (
        <Helmet title={seo.title} htmlAttributes={{ lang: `en`, dir: `ltr` }}>
            <html key="base-html-tag" lang="en" dir="ltr" app-name="Rustic Medico" />

            {links.map((link, index) => (
                <link key={`${link.href}-${index}`} rel={link.rel} href={link.href} />
            ))}

            <link rel="canonical" href={currentLocation} />
            <link
                rel="icon"
                href={`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2280%22>${seo.faviconEmoji}</text></svg>`}
            ></link>

            <meta name="theme-color" content="#fff" />
            <meta key="meta-description" name="description" content={seo.description} />
            <meta key="meta-image" name="image" content={seo.image} />

            {/* Open Graph */}
            <meta key="og-site-name" name="og:site_name" content="Faced Brain" />
            <meta key="og-title" name="og:title" content={seo.title} />
            <meta key="og-description" name="og:description" content={seo.description} />
            <meta key="og-image" name="og:image" content={seo.image} />
            <meta key="og-locale" name="og:locale" content="en_US" />
            <meta key="og-type" name="og:type" content="website" />
            <meta key="og-url" name="og:url" content="https://admin.rustic-medico.ml" />

            {/* Twitter */}
            <meta key="twitter-card" name="twitter:card" content="summary_large_image" />
            <meta key="twitter-title" name="twitter:title" content={seo.title} />
            <meta key="twitter-description" name="twitter:description" content={seo.description} />
            <meta key="twitter-image" name="twitter:image" content={seo.image} />
        </Helmet>
    );
};

export default SEO;
