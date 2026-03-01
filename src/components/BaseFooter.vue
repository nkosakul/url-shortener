<template>
  <footer class="footer">
    <div class="container">
      <nav aria-label="Footer navigation">
        <ul class="nav__list">
          <li>
            <a
              href="https://github.com/nkosakul/url-shortener"
              class="footer__link"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span class="sr-only">external URL:</span> Github
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/nkosakul/"
              class="footer__link"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span class="sr-only">external URL:</span> LinkedIn
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 1rem clamp(1.5rem, 1.071rem + 2.143vw, 3rem);
  color: var(--color-text-light);
  background-color: var(--color-bg-dark);
  flex-shrink: 0;
}

.nav__list {
  list-style: none;
  display: flex;
  justify-content: flex-end;
  gap: 1.5rem;
  padding: 0;
  margin: 0;
}

.footer__link {
  color: var(--color-text-light);
  text-decoration: none;
}
</style>
