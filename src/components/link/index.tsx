import React from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import styles from './link.module.scss';

type Props = {
  route: string;
  displayName: string;
};

const Link: React.FC<Props> = ({ route, displayName }: Props) => {
  const router = useRouter();


  return (
    <NextLink href={`${route}`}>
      <a className={router.pathname == `${route}` ? styles.active : ""}>{displayName}</a>
    </NextLink>
  );
  
};

export default Link;