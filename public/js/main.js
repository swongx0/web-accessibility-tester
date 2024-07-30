const testAccessibility = async (e) => {
    e.preventDefault()

    const url = document.querySelector('#url').value
    
    console.log(url)

    if(url === '') {
        alert('Please add a url')
    } else {
        setLoading()

        const response = await fetch(`/api/test?url=${url}`)

        if(response.status !== 200) {
            setLoading(false)
            alert('Something went wrong')
        } else {
            const {issues} = await response.json()
            addIssuesToDOM(issues)
            setLoading(false)
        }
    }
}

const addIssuesToDOM = (issues) => {
    const issuesOutput = document.querySelector('#issues')

    issuesOutput.innerHTML = ''

    if(issues.length === 0) {
        issuesOutput.innerHTML = '<h4>No Issues Found</h4>'
    } else {
        issues.forEach((issue) => {
            const output = `
                <div class="card m-3">
                    <div class="card-body">
                        <h4>${issue.message}</h4>
                        <p class="bg-light p-3 my-3">
                            ${escapeHTML(issue.context)}
                        </p>

                        <p class="bg-secondary text-light p-2">
                            CODE: ${issue.code}
                        </p>
                    </div>
                </div>
            `

            issuesOutput.innerHTML += output
        })
    }
}

const setLoading = (isLoading = true) => {
     const loader = document.querySelector('.loader')
     if(isLoading) {
        loader.style.display = 'block'
     } else {
        loader.style.display = 'none'
     }
}

function escapeHTML(html) {
    return html
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
}


document.querySelector('#form').addEventListener('submit', testAccessibility)

function toggleSearch() {
    const searchInput = document.getElementById('form')
    const button = document.querySelector('.start-btn')

    button.style.display = 'none';
    searchInput.style.display = 'block';
}

const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.pageX + 'px';
    cursor.style.top = e.pageY + 'px';
})

var i = 0;
var txt = 'Website Accessibility Tester.';
var speed = 90;

function typeWriter() {
  if (i < txt.length) {
    const heading = document.getElementById("main-heading");
    if (i < txt.length) {
        heading.innerHTML = txt.substring(0, i + 1) + '<span class="caret" id="caret"></span>';
        i++;
        setTimeout(typeWriter, speed);
    } else {
        // Remove the caret after the typing is done
        document.getElementById("caret").style.display = 'none';
    }
  }
}

typeWriter()