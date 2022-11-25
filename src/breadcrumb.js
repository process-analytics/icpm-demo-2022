// Remove section of secondary diagram in Breadcrumb
export function removeSectionInBreadcrumb() {
  const breadcrumbElt = document.getElementsByClassName('breadcrumb').item(0);
  breadcrumbElt.removeChild(document.getElementById('secondary-diagram'));
}

// Add section of secondary diagram in Breadcrumb
export function addSectionInBreadcrumb() {
  const aElt = document.createElement('a');
  aElt.setAttribute('href', '#');
  aElt.appendChild(document.createTextNode('SRM subprocess'));

  const liElt = document.createElement('li');
  liElt.setAttribute('id', 'secondary-diagram');
  liElt.setAttribute('class', 'breadcrumb-item');
  liElt.appendChild(aElt);

  const breadcrumbElt = document.getElementsByClassName('breadcrumb').item(0);
  breadcrumbElt.appendChild(liElt);
}
