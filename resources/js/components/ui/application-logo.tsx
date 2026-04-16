interface ApplicationLogoProps {
    className?: string;
}

export default function ApplicationLogo({ className = 'h-10 w-10' }: ApplicationLogoProps) {
    return (
        <img
            src="/images/logo_bionus.svg"
            alt="BioNusantara"
            className={`${className} object-contain`}
        />
    );
}